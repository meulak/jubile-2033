import { useState, useCallback } from 'react';

/**
 * Custom hook to handle API calls with loading, error, and data states.
 * @param {Function} apiFunction - The service function to execute.
 * @returns {Object} { execute, loading, error, data }
 */
export const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        // Extract message from error object (returned by apiClient interceptor)
        const errorMessage = err.error?.message || err.message || 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { execute, loading, error, data, setData };
};
