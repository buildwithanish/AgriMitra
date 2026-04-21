import {
  createContactLead,
  getPlatformSettings,
  listContactLeads
} from "../repositories/platformRepository.js";
import { sendContactLeadEmail } from "../services/emailService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitContactLead = asyncHandler(async (req, res) => {
  const { name, email, phone, role, interest, message, source } = req.body;

  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanPhone = String(phone || "").trim();
  const cleanMessage = String(message || "").trim();

  if (!cleanName || !cleanEmail) {
    res.status(400);
    throw new Error("Name and email are required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  if (cleanPhone && !/^[+\d\s-]{8,20}$/.test(cleanPhone)) {
    res.status(400);
    throw new Error("Please provide a valid phone number");
  }

  const lead = await createContactLead({
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    role,
    interest,
    message: cleanMessage,
    source
  });
  const settings = await getPlatformSettings();
  const emailDelivery = await sendContactLeadEmail({ lead, settings });

  res.status(201).json({
    success: true,
    data: {
      lead,
      emailDelivery
    },
    message: "Registration request received. Our team will contact you shortly."
  });
});

export const getContactLeads = asyncHandler(async (req, res) => {
  const leads = await listContactLeads({ limit: 50 });
  res.json({ success: true, data: { leads } });
});
