const express = require('express');
const router = express.Router();
const axios = require('axios');
const embeddingService = require('../services/embeddingService');
const Product = require('../models/Product');

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

        // Find relevant products based on the user's message
        const similarProducts = await embeddingService.findSimilarProducts(message);

        // Get total product count
        const totalProducts = await Product.countDocuments();

        // Create context from similar products
        const context = similarProducts.map(product =>
            `Product: ${product.metadata.title}\n` +
            `Description: ${product.metadata.description}\n` +
            `Category: ${product.metadata.category}\n` +
            `Brand: ${product.metadata.brand}\n` +
            `Price: $${product.metadata.price}\n` +
            `Rating: ${product.metadata.averageReview}/5\n`
        ).join('\n');

        // Create a prompt that includes the context
        const prompt = `You are a helpful e-commerce assistant. Use the following information to help answer the customer's question:

Store Information:
- Total number of products: ${totalProducts}

Relevant Products:
${context}

Customer Question: ${message}

Please provide a helpful response that incorporates relevant product information when appropriate. If the question is about the store in general (like total number of products), use the store information. If it's about specific products, use the relevant products information.`;

        console.log('Sending request to Cohere API with context');
        const response = await axios.post(
            'https://api.cohere.ai/v1/chat',
            {
                message: prompt,
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

        console.log('Received response from Cohere API');

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

        if (error.response) {
            return res.status(error.response.status).json({
                success: false,
                error: 'AI service error',
                details: error.response.data
            });
        } else if (error.request) {
            return res.status(503).json({
                success: false,
                error: 'AI service is not responding'
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Failed to process request',
                details: error.message
            });
        }
    }
});

// Update product embeddings
router.post('/update-embeddings', async (req, res) => {
    try {
        if (!process.env.COHERE_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'COHERE_API_KEY is not set in environment variables'
            });
        }

        console.log('Starting product embeddings update...');
        await embeddingService.updateProductEmbeddings();

        res.json({
            success: true,
            message: 'Product embeddings updated successfully'
        });
    } catch (error) {
        console.error('Update Embeddings Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update embeddings',
            details: error.message
        });
    }
});

module.exports = router; 