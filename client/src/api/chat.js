import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, { message });
        return response.data;
    } catch (error) {
        console.error('Chat API Error:', error.response?.data || error.message);
        throw new Error(
            error.response?.data?.error ||
            error.response?.data?.details ||
            error.message ||
            'Failed to send message'
        );
    }
}; 