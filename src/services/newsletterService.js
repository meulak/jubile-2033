import apiClient from './apiClient';

export const newsletterService = {
  /**
   * Subscribe a new user to the newsletter
   * @param {string} email 
   * @param {string} language 
   */
  subscribe: (email, language = 'fr') =>
    apiClient.post('/newsletter/subscribe', { email, language }),

  /**
   * Confirm subscription via token
   * @param {string} token 
   */
  confirmSubscription: (token) =>
    apiClient.post(`/newsletter/confirm/${token}`),

  /**
   * Unsubscribe a user
   * @param {string} email 
   */
  unsubscribe: (email) =>
    apiClient.post('/newsletter/unsubscribe', { email }),

  /**
   * Update subscriber preferences
   * @param {string} email 
   * @param {Object} preferences 
   */
  updatePreferences: (email, preferences) =>
    apiClient.post('/newsletter/preferences', { email, ...preferences }),

  /**
   * Get subscription status and preferences
   * @param {string} email 
   */
  getSubscriptionStatus: (email) =>
    apiClient.get(`/newsletter/status/${email}`),
};
