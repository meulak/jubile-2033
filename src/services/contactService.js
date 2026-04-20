import apiClient from './apiClient';

export const contactService = {
  /**
   * Submit the contact form
   * @param {Object} formData 
   */
  submitContact: (formData) =>
    apiClient.post('/contact', formData),

  /**
   * Submit contact form with potential file attachments
   * @param {Object} formData 
   */
  submitContactWithFile: (formData) => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    
    return apiClient.post('/contact', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
