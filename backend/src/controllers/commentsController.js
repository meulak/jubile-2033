const Comment = require('../models/Comment');

/**
 * Create a new comment
 */
exports.createComment = async (req, res, next) => {
  try {
    const { articleId, name, email, text, parentCommentId } = req.body;

    const comment = await Comment.create({
      articleId,
      authorName: name,
      authorEmail: email,
      text,
      parentCommentId: parentCommentId || null
    });

    res.status(201).json({
      success: true,
      commentId: comment.id,
      message: 'Comment submitted! It will be visible once approved by a moderator.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get approved comments for an article
 */
exports.getComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const { count, rows: comments } = await Comment.findAndCountAll({
      where: { articleId, status: 'approved' },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.status(200).json({
      success: true,
      comments,
      total: count,
      page,
      hasMore: count > offset + comments.length
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Approve a comment (Admin only)
 */
exports.approveComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Comment not found.' }
      });
    }

    comment.status = 'approved';
    await comment.save();

    res.status(200).json({
      success: true,
      comment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a comment (Admin only)
 */
exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Comment not found.' }
      });
    }

    await comment.destroy();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all comments for moderation
 */
exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
