import apiClient from './apiClient';

export const commentService = {
  /**
   * Get approved comments for an article
   * @param {string} articleId 
   * @param {number} page 
   */
  getComments: (articleId, page = 1) =>
    apiClient.get(`/articles/comments/${articleId}`, { params: { page } }),

  /**
   * Submit a new comment
   * @param {string} articleId 
   * @param {Object} commentData 
   */
  postComment: (articleId, commentData) =>
    apiClient.post('/articles/comments', {
      articleId,
      ...commentData,
    }),

  /**
   * Delete a comment (Admin only)
   * @param {string} commentId 
   */
  deleteComment: (commentId) =>
    apiClient.delete(`/articles/comments/${commentId}`),

  /**
   * Approve a comment (Admin only)
   * @param {string} commentId 
   */
  approveComment: (commentId) =>
    apiClient.post(`/articles/comments/${commentId}/approve`),

  /**
   * Fetch all comments for moderation (Admin only)
   * Note: This assumes a dedicated endpoint or filtered get.
   */
  getAllComments: () =>
    apiClient.get('/articles/comments/all'), // This might need a new route in backend
    
  /**
   * Update comment status
   * @param {string} commentId 
   * @param {string} status 
   */
  updateStatus: (commentId, status) => {
    if (status === 'approved') return apiClient.post(`/articles/comments/${commentId}/approve`);
    // Placeholder for other statuses like 'spam' if implemented in backend
    return apiClient.put(`/articles/comments/${commentId}/status`, { status });
  }
};
