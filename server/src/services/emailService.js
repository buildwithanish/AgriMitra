import { env } from "../config/env.js";

function hasSmtpConfig() {
  return Boolean(env.smtp.host && env.smtp.user && env.smtp.pass);
}

export async function sendContactLeadEmail({ lead, settings }) {
  const adminEmail = settings?.contact?.email || env.adminEmail;

  if (!adminEmail) {
    return { status: "skipped", reason: "Admin email not configured" };
  }

  if (!hasSmtpConfig()) {
    return { status: "skipped", reason: "SMTP is not configured" };
  }

  try {
    const { default: nodemailer } = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass
      }
    });

    const subject = `New AI Village Brain contact request from ${lead.name}`;
    const html = `
      <h2>New Contact Registration</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || "Not provided"}</p>
      <p><strong>Role:</strong> ${lead.role || "farmer"}</p>
      <p><strong>Interest:</strong> ${lead.interest || "general"}</p>
      <p><strong>Message:</strong> ${lead.message || "No message"}</p>
    `;

    const info = await transporter.sendMail({
      from: env.smtp.from || env.smtp.user,
      to: adminEmail,
      subject,
      html,
      replyTo: lead.email
    });

    return { status: "sent", messageId: info.messageId };
  } catch (error) {
    return { status: "failed", reason: error.message };
  }
}
