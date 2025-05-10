const mongoose = require("mongoose");

const ProductEmbeddingSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        embedding: {
            type: [Number],
            required: true,
        },
        metadata: {
            title: String,
            description: String,
            category: String,
            brand: String,
            price: Number,
            averageReview: Number,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProductEmbedding", ProductEmbeddingSchema); 