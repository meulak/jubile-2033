const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Transporter configuration (supports SMTP, Gmail, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: process.env.SMTP_PORT || 2525,
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
  },
});

/**
 * Loads an HTML template from the filesystem
 * @param {string} templateName 
 * @returns {string} HTML content
 */
const loadTemplate = (templateName) => {
  try {
    const templatePath = path.join(__dirname, `../templates/${templateName}.html`);
    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`Error loading template ${templateName}:`, error);
    throw new Error(`Template ${templateName} not found`);
  }
};

/**
 * Replaces placeholders like {{variable}} with actual values
 * @param {string} html 
 * @param {Object} variables 
 * @returns {string} Replaced HTML
 */
const replaceVariables = (html, variables) => {
  let result = html;
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, variables[key] || '');
  });
  return result;
};

/**
 * Send an email using a template
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} templateName - Name of the .html file in templates/
 * @param {Object} variables - Data to inject into the template
 */
const sendEmail = async (to, subject, templateName, variables = {}) => {
  try {
    const rawHtml = loadTemplate(templateName);
    const html = replaceVariables(rawHtml, variables);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Jubilé 2033" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log('✉️ Email sent: %s (%s)', info.messageId, templateName);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    throw error;
  }
};

/**
 * Helper to send newsletter confirmation email (legacy wrapper)
 */
const sendConfirmationEmail = async (to, token, language = 'fr') => {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const confirmationLink = `${baseUrl}/newsletter/confirm?token=${token}`;
  const unsubscribeLink = `${baseUrl}/newsletter/unsubscribe?email=${to}`;

  return sendEmail(to, 'Confirmez votre inscription à la newsletter', 'welcome', {
    name: to,
    confirmationLink,
    unsubscribeLink
  });
};

module.exports = {
  sendEmail,
  loadTemplate,
  replaceVariables,
  sendConfirmationEmail,
};
