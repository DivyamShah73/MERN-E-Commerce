const axios = require('axios');
const Product = require('../models/Product');
const ProductEmbedding = require('../models/ProductEmbedding');

class EmbeddingService {
    constructor() {
        this.apiKey = process.env.COHERE_API_KEY;
        this.baseUrl = 'https://api.cohere.ai/v1';
    }

    async generateEmbedding(text) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/embed`,
                {
                    texts: [text],
                    model: 'embed-english-v3.0',
                    input_type: 'search_document'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.embeddings[0];
        } catch (error) {
            console.error('Error generating embedding:', error);
            throw error;
        }
    }

    async updateProductEmbeddings() {
        try {
            console.log('Fetching all products...');
            const products = await Product.find({});
            console.log(`Found ${products.length} products to process`);

            for (const product of products) {
                console.log(`Processing product: ${product.title}`);
                const textToEmbed = `${product.title} ${product.description} ${product.category} ${product.brand}`;
                const embedding = await this.generateEmbedding(textToEmbed);

                await ProductEmbedding.findOneAndUpdate(
                    { productId: product._id },
                    {
                        productId: product._id,
                        embedding,
                        metadata: {
                            title: product.title,
                            description: product.description,
                            category: product.category,
                            brand: product.brand,
                            price: product.price,
                            averageReview: product.averageReview
                        },
                        lastUpdated: new Date()
                    },
                    { upsert: true, new: true }
                );
                console.log(`Updated embedding for product: ${product.title}`);
            }
            return true;
        } catch (error) {
            console.error('Error updating product embeddings:', error);
            throw error;
        }
    }

    async findSimilarProducts(query, limit = 5) {
        try {
            const queryEmbedding = await this.generateEmbedding(query);

            // Find all product embeddings
            const allEmbeddings = await ProductEmbedding.find({});

            // Calculate cosine similarity for each product
            const similarities = allEmbeddings.map(product => ({
                productId: product.productId,
                metadata: product.metadata,
                similarity: this.cosineSimilarity(queryEmbedding, product.embedding)
            }));

            // Sort by similarity and return top results
            return similarities
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, limit);
        } catch (error) {
            console.error('Error finding similar products:', error);
            throw error;
        }
    }

    cosineSimilarity(vecA, vecB) {
        const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }
}

module.exports = new EmbeddingService(); 