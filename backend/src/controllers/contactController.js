const { sendEmail } = require('../services/emailService');
const ContactSubmission = require('../models/ContactSubmission');

/**
 * Handle contact form submission
 */
exports.handleContact = async (req, res, next) => {
  try {
    const { name, email, subject, message, attachmentUrl } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // 1. Save to Database
    const submission = await ContactSubmission.create({
      name,
      email,
      subject,
      message,
      attachmentUrl,
      ipAddress
    });

    // 2. Send email to Admin
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    await sendEmail(
      process.env.ADMIN_EMAIL || 'admin@impronte-africane.com',
      `[CONTACT] ${subject}`,
      'contact-notification',
      {
        name,
        email,
        subject,
        message,
        dashboardLink: `${baseUrl}/admin/contacts`
      }
    );

    // 3. Send confirmation to User
    await sendEmail(email, 'Confirmation de réception - Jubilé 2033', 'contact-reply', {
      name,
      message
    });

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.',
      submissionId: submission.id
    });
  } catch (error) {
    next(error);
  }
};
