import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: "admin" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: false },
    phone: { type: String, required: true, trim: true },
    address: { type: String, default: "" },
    dob: { type: String, default: "" },
    source: { type: String, required: true },
    interests: { type: [String], default: [] },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const donationSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true, index: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    payerName: { type: String, default: "" },
    payerEmail: { type: String, default: "" },
    provider: { type: String, required: true, default: "paynow" },
    providerStatus: { type: String, required: true, default: "pending", index: true },
    providerPayload: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const cellGroupFeedbackSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true, trim: true },
    groupLeader: { type: String, required: true, trim: true },
    attendance: { type: Number, required: true, min: 0 },
    offering: { type: Number, required: true, min: 0 },
    meetingTime: { type: String, required: true, trim: true },
    notes: { type: String, default: "" },
    status: { type: String, required: true, default: "new" }, // new | reviewed
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const AdminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const RegistrationModel =
  mongoose.models.Registration || mongoose.model("Registration", registrationSchema);
export const DonationModel = mongoose.models.Donation || mongoose.model("Donation", donationSchema);
export const CellGroupFeedbackModel =
  mongoose.models.CellGroupFeedback || mongoose.model("CellGroupFeedback", cellGroupFeedbackSchema);

export const initDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is required in environment.");
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });
};

export const ensureDefaultAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return;
  }

  const normalizedEmail = adminEmail.toLowerCase();
  const existing = await AdminModel.findOne({ email: normalizedEmail }).select("_id").lean();

  if (existing) {
    return;
  }

  const hash = await bcrypt.hash(adminPassword, 12);
  await AdminModel.create({
    email: normalizedEmail,
    passwordHash: hash,
    role: "admin",
  });
};
