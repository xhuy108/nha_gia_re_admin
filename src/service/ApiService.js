import axios from 'axios';

const API_BASE_URL = 'https://nha-gia-re-server.onrender.com/api/v1/admin'; // Replace with your API base URL

// Creating an instance of Axios with custom configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define your API service functions
const ApiService = {
  // Example function to fetch data from the API
  get: async (url) => {
    try {
      const response = await api.get(`/${url}`);
      const data = response.data.result;
      console.log('data from API service helper:', data);
      return data;
    } catch (error) {
      // Handle error
      console.error('Error while fetching data:', error);
      throw error;
    }
  },

  // Example function to send data to the API
  post: async ({ url, data }) => {
    try {
      const response = await api.post(`/${url}`, data);
      const result = response.data;
      console.log('data from API service helper:', response);
      return result;
    } catch (error) {
      // Handle error
      console.error('Error while sending data:', error);
      throw error;
    }
  },
  patch: async ({ url, data }) => {
    try {
      const response = await api.patch(`/${url}`, data);
      const result = response.data;
      console.log('data from API service helper:', response);
      return result;
    } catch (error) {
      // Handle error
      console.error('Error while sending data:', error.message);
      throw error;
    }
  },
  delete: async ({ url }) => {
    try {
      const response = await api.delete(`/${url}`);
      const result = response.data;
      console.log('data from API service helper:', response);
      return result;
    } catch (error) {
      // Handle error
      console.error('Error while sending data:', error);
      throw error;
    }
  },
};

export default ApiService;
