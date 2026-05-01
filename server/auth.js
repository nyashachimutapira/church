import jwt from "jsonwebtoken";

export const createAdminToken = (admin) => {
  const subject = admin.id || String(admin._id || "");
  return jwt.sign(
    { sub: subject, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
};

export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Missing auth token." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Admin role required." });
    }
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired auth token." });
  }
};

export const createMemberToken = (member) => {
  const subject = member.id || String(member._id || "");
  return jwt.sign(
    { sub: subject, email: member.email, role: "member" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const requireMember = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Missing auth token." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "member" && payload.role !== "admin") {
      return res.status(403).json({ message: "Member role required." });
    }
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired auth token." });
  }
};
