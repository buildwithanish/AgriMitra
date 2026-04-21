import {
  createContactLead,
  listContactLeads
} from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitContactLead = asyncHandler(async (req, res) => {
  const { name, email, phone, role, interest, message, source } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Name and email are required");
  }

  const lead = await createContactLead({
    name,
    email,
    phone,
    role,
    interest,
    message,
    source
  });

  res.status(201).json({
    success: true,
    data: lead,
    message: "Registration request received. Our team will contact you shortly."
  });
});

export const getContactLeads = asyncHandler(async (req, res) => {
  const leads = await listContactLeads({ limit: 50 });
  res.json({ success: true, data: { leads } });
});
