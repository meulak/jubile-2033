const sequelize = require('../config/database');
const Subscriber = require('../models/Subscriber');
const Comment = require('../models/Comment');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Careful: force: true DROPS tables before recreating
    console.log('Database tables dropped and recreated.');

    // 1. Create Subscribers
    await Subscriber.bulkCreate([
      {
        email: 'test@impronte.org',
        language: 'fr',
        status: 'confirmed',
      },
      {
        email: 'news@afrique.com',
        language: 'en',
        status: 'pending',
      }
    ]);
    console.log('✅ Subscribers seeded');

    // 2. Create Initial Comments
    await Comment.bulkCreate([
      {
        articleId: '1',
        authorName: 'Marie-Claire',
        authorEmail: 'marie@example.com',
        text: "Cet article est une mine d'or pour notre groupe de recherche biblique. Merci pour ces éclaircissements théologiques profonds !",
        status: 'approved'
      },
      {
        articleId: '1',
        authorName: 'Jean-Luc M.',
        authorEmail: 'jeanluc@example.com',
        text: "Très intéressant. Savez-vous s'il y aura une publication papier de ces recherches en 2033 ?",
        status: 'pending'
      }
    ]);
    console.log('✅ Comments seeded');

    console.log('🚀 Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
