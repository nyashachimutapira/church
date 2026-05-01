import "dotenv/config";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { AdminModel, CellGroupFeedbackModel, DonationModel, RegistrationModel, ensureDefaultAdmin, initDb } from "./db.js";
import { createAdminToken, requireAdmin, createMemberToken, requireMember } from "./auth.js";
import { cellGroupFeedbackSchema, donationIntentSchema, loginSchema, registerSchema, memberLoginSchema } from "./validation.js";

const app = express();
const port = Number(process.env.API_PORT || 4000);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: frontendOrigin }));
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf?.toString("utf8") || "";
  },
}));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", generalLimiter);

const verifyCaptchaToken = async (token) => {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    return process.env.NODE_ENV !== "production";
  }

  if (!token) {
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: turnstileSecret,
      response: token,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return Boolean(result.success);
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/register", authLimiter, async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid registration payload.", errors: parsed.error.flatten() });
  }

  const { website, captchaToken, password, ...payload } = parsed.data;
  if (website) {
    return res.status(400).json({ message: "Spam request rejected." });
  }

  const captchaOk = await verifyCaptchaToken(captchaToken);
  if (!captchaOk) {
    return res.status(400).json({ message: "Captcha verification failed." });
  }

  const existingUser = await RegistrationModel.findOne({ email: payload.email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered." });
  }

  let passwordHash = undefined;
  if (password) {
    passwordHash = await bcrypt.hash(password, 12);
  }

  await RegistrationModel.create({
    ...payload,
    passwordHash,
    interests: payload.interests,
  });

  return res.status(201).json({ message: "Registration submitted successfully." });
});

app.post("/api/cell-groups/feedback", authLimiter, async (req, res) => {
  const parsed = cellGroupFeedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid feedback payload.", errors: parsed.error.flatten() });
  }

  const { website, captchaToken, ...payload } = parsed.data;
  if (website) {
    return res.status(400).json({ message: "Spam request rejected." });
  }

  const captchaOk = await verifyCaptchaToken(captchaToken);
  if (!captchaOk) {
    return res.status(400).json({ message: "Captcha verification failed." });
  }

  await CellGroupFeedbackModel.create({
    groupName: payload.groupName,
    groupLeader: payload.groupLeader,
    attendance: payload.attendance,
    offering: payload.offering,
    meetingTime: payload.meetingTime,
    notes: payload.notes,
    status: "new",
  });

  return res.status(201).json({ message: "Feedback submitted successfully." });
});

app.post("/api/admin/login", authLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid login payload." });
  }

  const admin = await AdminModel.findOne({ email: parsed.data.email }).select(
    "_id email passwordHash role"
  );

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const passwordOk = await bcrypt.compare(parsed.data.password, admin.passwordHash);
  if (!passwordOk) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = createAdminToken(admin);
  return res.json({ token, role: admin.role, email: admin.email });
});

app.post("/api/member/login", authLimiter, async (req, res) => {
  const parsed = memberLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid login payload." });
  }

  const member = await RegistrationModel.findOne({ email: parsed.data.email }).select(
    "_id email passwordHash fullName"
  );

  if (!member || !member.passwordHash) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const passwordOk = await bcrypt.compare(parsed.data.password, member.passwordHash);
  if (!passwordOk) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = createMemberToken(member);
  return res.json({ token, role: "member", email: member.email, fullName: member.fullName });
});

app.get("/api/admin/members", requireAdmin, async (req, res) => {
  const rawSearch = typeof req.query.search === "string" ? req.query.search : "";
  const search = rawSearch.trim();
  const regex = search ? new RegExp(search, "i") : null;

  const filters = regex
    ? { $or: [{ fullName: regex }, { email: regex }, { phone: regex }] }
    : {};

  const members = await RegistrationModel.find(filters)
    .sort({ createdAt: -1 })
    .lean();

  const normalizedMembers = members.map((member) => ({
    id: String(member._id),
    fullName: member.fullName,
    email: member.email,
    phone: member.phone,
    address: member.address,
    source: member.source,
    dob: member.dob,
    interests: member.interests,
    timestamp: member.createdAt,
  }));

  return res.json({ members: normalizedMembers });
});

app.get("/api/admin/stats", requireAdmin, async (req, res) => {
  const totalMembers = await RegistrationModel.countDocuments();
  const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const newThisWeek = await RegistrationModel.countDocuments({
    createdAt: { $gte: new Date(weekStart) },
  });
  const givingResult = await DonationModel.aggregate([
    { $match: { providerStatus: { $in: ["paid", "completed"] } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const giving = givingResult[0]?.total || 0;

  return res.json({
    totalMembers,
    newThisWeek,
    monthlyGiving: Number(giving),
  });
});

app.get("/api/admin/cell-group-feedback", requireAdmin, async (_req, res) => {
  const feedback = await CellGroupFeedbackModel.find()
    .sort({ createdAt: -1 })
    .limit(250)
    .lean();

  const normalizedFeedback = feedback.map((entry) => ({
    id: String(entry._id),
    groupName: entry.groupName,
    groupLeader: entry.groupLeader,
    attendance: entry.attendance,
    offering: entry.offering,
    meetingTime: entry.meetingTime,
    notes: entry.notes,
    status: entry.status,
    timestamp: entry.createdAt,
  }));

  return res.json({ feedback: normalizedFeedback });
});

app.get("/api/member/dashboard", requireMember, async (req, res) => {
  const email = req.user.email;
  const member = await RegistrationModel.findOne({ email }).select("-passwordHash").lean();
  
  if (!member) {
    return res.status(404).json({ message: "Member not found." });
  }

  const donations = await DonationModel.find({ payerEmail: email })
    .sort({ createdAt: -1 })
    .lean();

  return res.json({ member, donations });
});

app.post("/api/donations/intent", authLimiter, async (req, res) => {
  const parsed = donationIntentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid donation payload." });
  }

  const { website, captchaToken, ...payload } = parsed.data;
  if (website) {
    return res.status(400).json({ message: "Spam request rejected." });
  }

  const captchaOk = await verifyCaptchaToken(captchaToken);
  if (!captchaOk) {
    return res.status(400).json({ message: "Captcha verification failed." });
  }

  const reference = `DN-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  await DonationModel.create({
    reference,
    amount: payload.amount,
    category: payload.category,
    payerName: payload.payerName,
    payerEmail: payload.payerEmail,
    providerStatus: "pending",
  });

  const paynowBaseUrl = process.env.PAYNOW_LINK || "https://www.paynow.co.zw/thcp";
  const paynowLink = `${paynowBaseUrl}?reference=${encodeURIComponent(reference)}&amount=${payload.amount}`;
  return res.status(201).json({ reference, paynowLink });
});

app.post("/api/webhooks/paynow", async (req, res) => {
  const sharedSecret = process.env.PAYNOW_WEBHOOK_SECRET;
  const signature = req.headers["x-paynow-signature"];

  if (sharedSecret) {
    const computed = crypto
      .createHmac("sha256", sharedSecret)
      .update(req.rawBody || "")
      .digest("hex");
    if (signature !== computed) {
      return res.status(401).json({ message: "Invalid webhook signature." });
    }
  }

  const reference = String(req.body?.reference || "");
  if (!reference) {
    return res.status(400).json({ message: "Missing donation reference." });
  }

  const normalizedStatus = String(req.body?.status || "pending").toLowerCase();
  await DonationModel.findOneAndUpdate(
    { reference },
    {
      $set: {
        providerStatus: normalizedStatus,
        providerPayload: req.body || {},
        updatedAt: new Date(),
      },
    }
  );

  return res.json({ ok: true });
});

// Serve static frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).json({ message: "Unexpected server error." });
});

const bootstrap = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in environment.");
  }

  await initDb();
  await ensureDefaultAdmin();
  app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
  });
};

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
