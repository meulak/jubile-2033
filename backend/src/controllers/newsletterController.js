const crypto = require('crypto');
const Subscriber = require('../models/Subscriber');
const { sendEmail } = require('../services/emailService');

/**
 * Subscribe a new user to the newsletter
 */
exports.subscribe = async (req, res, next) => {
  try {
    const { email, language } = req.body;

    // Check if already exists
    let subscriber = await Subscriber.findOne({ where: { email } });

    if (subscriber) {
      if (subscriber.status === 'confirmed') {
        return res.status(400).json({
          success: false,
          error: { code: 'ALREADY_SUBSCRIBED', message: 'You are already subscribed to our newsletter.' }
        });
      }
      // If pending or unsubscribed, reset it
      subscriber.status = 'pending';
      subscriber.language = language || subscriber.language;
    } else {
      subscriber = Subscriber.build({ email, language });
    }

    // Generate confirmation token
    const token = crypto.randomBytes(32).toString('hex');
    subscriber.confirmationToken = token;
    await subscriber.save();

    // Send confirmation email
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    await sendEmail(email, 'Confirmez votre inscription à la newsletter', 'welcome', {
      name: email,
      confirmationLink: `${baseUrl}/newsletter/confirm?token=${token}`,
      unsubscribeLink: `${baseUrl}/newsletter/unsubscribe?email=${email}`
    });

    res.status(200).json({
      success: true,
      message: 'Subscription successful! Please check your email to confirm.',
      confirmationSent: true
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Confirm subscription via token
 */
exports.confirm = async (req, res, next) => {
  try {
    const { token } = req.params;

    const subscriber = await Subscriber.findOne({ where: { confirmationToken: token } });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired confirmation token.' }
      });
    }

    subscriber.status = 'confirmed';
    subscriber.confirmationToken = null;
    await subscriber.save();

    // Send "Subscription Confirmed" email
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    await sendEmail(subscriber.email, 'Abonnement confirmé !', 'newsletter-confirm', {
      siteLink: baseUrl
    });

    res.status(200).json({
      success: true,
      message: 'Subscription confirmed! Welcome to Jubilé 2033.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Unsubscribe a user
 */
exports.unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    const subscriber = await Subscriber.findOne({ where: { email } });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Email address not found.' }
      });
    }

    subscriber.status = 'unsubscribed';
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'You have been successfully unsubscribed.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get subscriber status and preferences
 */
exports.getStatus = async (req, res, next) => {
  try {
    const { email } = req.params;
    const subscriber = await Subscriber.findOne({ where: { email } });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Subscriber not found.' }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        status: subscriber.status,
        language: subscriber.language,
        preferences: subscriber.preferences,
        subscribedAt: subscriber.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update preferences
 */
exports.updatePreferences = async (req, res, next) => {
  try {
    const { email, language, frequency, categories } = req.body;
    const subscriber = await Subscriber.findOne({ where: { email } });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Subscriber not found.' }
      });
    }

    // Update preferences object deeply
    const currentPrefs = subscriber.preferences || {};
    subscriber.preferences = {
      ...currentPrefs,
      frequency: frequency || currentPrefs.frequency,
      categories: categories || currentPrefs.categories
    };
    
    if (language) subscriber.language = language;

    await subscriber.save();

    res.status(200).json({
      success: true,
      updatedPreferences: subscriber.preferences
    });
  } catch (error) {
    next(error);
  }
};
