const express = require('express');
const router = express.Router();
const axios = require('axios');

// List available models
router.get('/list-models', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'GEMINI_API_KEY is not set in environment variables'
            });
        }

        console.log('Fetching available models...');
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
        );

        return res.json({
            success: true,
            models: response.data
        });
    } catch (error) {
        console.error('List Models Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        return res.status(error.response?.status || 500).json({
            success: false,
            error: 'Failed to list models',
            details: error.response?.data || error.message
        });
    }
});

// Test endpoint to verify API key
router.get('/test-key', async (req, res) => {
    try {
        if (!process.env.COHERE_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'COHERE_API_KEY is not set in environment variables'
            });
        }

        console.log('Testing Cohere API key...');

        const response = await axios.post(
            'https://api.cohere.ai/v1/chat',
            {
                message: "Hello, this is a test message.",
                model: "command",
                temperature: 0.7,
                max_tokens: 300
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data) {
            return res.json({
                success: true,
                message: 'API key is valid and working',
                response: response.data
            });
        }
    } catch (error) {
        console.error('API Key Test Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        return res.status(error.response?.status || 500).json({
            success: false,
            error: 'API key test failed',
            details: error.response?.data || error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received chat request:', req.body);
        const { message } = req.body;

        if (!message) {
            console.log('No message provided in request');
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        if (!process.env.COHERE_API_KEY) {
            console.error('COHERE_API_KEY is not set in environment variables');
            return res.status(500).json({
                success: false,
                error: 'AI service configuration error'
            });
        }

        console.log('Sending request to Cohere API with message:', message);
        console.log('Using API Key:', process.env.COHERE_API_KEY.substring(0, 5) + '...');

        const response = await axios.post(
            'https://api.cohere.ai/v1/chat',
            {
                message: message,
                model: "command",
                temperature: 0.7,
                max_tokens: 300,
                stream: false
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Received response from Cohere API:', JSON.stringify(response.data, null, 2));

        if (!response.data.text) {
            console.error('Unexpected response format from Cohere API:', response.data);
            return res.status(500).json({
                success: false,
                error: 'Invalid response from AI service'
            });
        }

        res.json({
            success: true,
            response: response.data.text
        });
    } catch (error) {
        console.error('Chat API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        // Handle specific error cases
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return res.status(error.response.status).json({
                success: false,
                error: 'AI service error',
                details: error.response.data
            });
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json({
                success: false,
                error: 'AI service is not responding'
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json({
                success: false,
                error: 'Failed to process request',
                details: error.message
            });
        }
    }
});

module.exports = router; 