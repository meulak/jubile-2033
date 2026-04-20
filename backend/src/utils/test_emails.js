const { loadTemplate, replaceVariables } = require('../services/emailService');

function testTemplates() {
  console.log('--- Testing Email Templates ---');
  
  const templates = ['welcome', 'contact-reply', 'contact-notification', 'newsletter-confirm'];
  
  const sampleVariables = {
    name: 'Jean-Luc',
    email: 'jeanluc@example.com',
    subject: 'Question sur le Jubilé',
    message: 'Bonjour, je souhaiterais en savoir plus sur les ressources bibliques.',
    confirmationLink: 'http://localhost:5173/confirm?token=xyz123',
    unsubscribeLink: 'http://localhost:5173/unsubscribe?email=jeanluc@example.com',
    siteLink: 'http://localhost:5173',
    dashboardLink: 'http://localhost:5173/admin/contacts'
  };

  templates.forEach(name => {
    try {
      const html = loadTemplate(name);
      const replaced = replaceVariables(html, sampleVariables);
      
      console.log(`✅ Template "${name}" loaded and variables replaced.`);
      
      // Check if some variables are still present (failed replacement)
      if (replaced.includes('{{')) {
        console.warn(`⚠️  Warning: Template "${name}" still contains unfiltered placeholders!`);
      }
    } catch (err) {
      console.error(`❌ Error in template "${name}":`, err.message);
    }
  });

  console.log('--- Test Complete ---');
}

testTemplates();
