const Joi = require('joi');

/**
 * Validation schema for newsletter subscription
 */
const validateSubscriber = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),
    language: Joi.string().valid('fr', 'en', 'it').default('fr')
  });

  return schema.validate(data);
};

/**
 * Validation schema for contact form
 */
const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(5).max(100).required(),
    message: Joi.string().min(10).max(1000).required(),
    attachmentUrl: Joi.string().uri().allow('', null)
  });

  return schema.validate(data);
};

/**
 * Validation schema for comments
 */
const validateComment = (data) => {
  const schema = Joi.object({
    articleId: Joi.string().required(),
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    text: Joi.string().min(10).max(500).required(),
    parentCommentId: Joi.string().allow(null, '')
  });

  return schema.validate(data);
};

/**
 * Middleware factory for Joi validation
 */
const validate = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message,
          details: error.details.map(d => d.message)
        }
      });
    }
    next();
  };
};

module.exports = {
  validate,
  validateSubscriber,
  validateContact,
  validateComment
};
