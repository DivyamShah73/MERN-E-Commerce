const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
require("dotenv").config({ path: __dirname + "/.env" });

// Generate a new hash for admin password
const bcrypt = require("bcryptjs");
const adminPassword = "admin123";
const hashPassword = bcrypt.hashSync(adminPassword, 12);

console.log("New hash generated:", hashPassword);

const users = [
  {
    userName: "store_admin",
    email: "admin123@gmail.com",
    password: hashPassword,
    role: "admin"
  }
];

const products = [
  // Men's Category
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Nike Dri-FIT T-Shirt",
    description: "Men's moisture-wicking training t-shirt",
    category: "Men",
    brand: "Nike",
    price: 35.99,
    salePrice: 29.99,
    totalStock: 100,
    averageReview: 4.5
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Adidas Track Pants",
    description: "Men's comfortable athletic pants",
    category: "Men",
    brand: "Adidas",
    price: 55.99,
    salePrice: 45.99,
    totalStock: 80,
    averageReview: 4.6
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Levi's 501 Jeans",
    description: "Classic straight fit jeans",
    category: "Men",
    brand: "Levi's",
    price: 69.99,
    salePrice: 59.99,
    totalStock: 120,
    averageReview: 4.8
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Zara Blazer",
    description: "Men's slim-fit formal blazer",
    category: "Men",
    brand: "Zara",
    price: 129.99,
    salePrice: 99.99,
    totalStock: 50,
    averageReview: 4.4
  },

  // Women's Category
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Nike Pro Sports Bra",
    description: "High-impact support sports bra",
    category: "Women",
    brand: "Nike",
    price: 45.99,
    salePrice: 39.99,
    totalStock: 90,
    averageReview: 4.7
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Adidas Leggings",
    description: "High-waisted training leggings",
    category: "Women",
    brand: "Adidas",
    price: 59.99,
    salePrice: 49.99,
    totalStock: 85,
    averageReview: 4.8
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Zara Summer Dress",
    description: "Floral print midi dress",
    category: "Women",
    brand: "Zara",
    price: 79.99,
    salePrice: 69.99,
    totalStock: 60,
    averageReview: 4.5
  },

  // Kids Category
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Nike Kids Shorts",
    description: "Comfortable athletic shorts for children",
    category: "Kids",
    brand: "Nike",
    price: 25.99,
    salePrice: 19.99,
    totalStock: 70,
    averageReview: 4.6
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Adidas Kids Tracksuit",
    description: "Two-piece sporty tracksuit",
    category: "Kids",
    brand: "Adidas",
    price: 65.99,
    salePrice: 55.99,
    totalStock: 45,
    averageReview: 4.7
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Puma Kids T-Shirt",
    description: "Graphic print cotton t-shirt",
    category: "Kids",
    brand: "Puma",
    price: 22.99,
    salePrice: 18.99,
    totalStock: 95,
    averageReview: 4.4
  },

  // Accessories
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Nike Cap",
    description: "Adjustable sports cap",
    category: "Accessories",
    brand: "Nike",
    price: 24.99,
    salePrice: 19.99,
    totalStock: 150,
    averageReview: 4.5
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Adidas Backpack",
    description: "Spacious athletic backpack",
    category: "Accessories",
    brand: "Adidas",
    price: 49.99,
    salePrice: 39.99,
    totalStock: 75,
    averageReview: 4.6
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Puma Socks Pack",
    description: "Pack of 3 athletic socks",
    category: "Accessories",
    brand: "Puma",
    price: 15.99,
    salePrice: 12.99,
    totalStock: 200,
    averageReview: 4.3
  },

  // Footwear
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Nike Air Max",
    description: "Comfortable running shoes with Air cushioning",
    category: "Footwear",
    brand: "Nike",
    price: 129.99,
    salePrice: 109.99,
    totalStock: 65,
    averageReview: 4.8
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Adidas Ultraboost",
    description: "Premium running shoes with Boost technology",
    category: "Footwear",
    brand: "Adidas",
    price: 179.99,
    salePrice: 149.99,
    totalStock: 55,
    averageReview: 4.9
  },
  {
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    title: "Puma RS-X",
    description: "Chunky lifestyle sneakers",
    category: "Footwear",
    brand: "Puma",
    price: 99.99,
    salePrice: 79.99,
    totalStock: 70,
    averageReview: 4.5
  }
];

const seedData = async () => {
  try {
    // Debug MongoDB URL
    console.log("MongoDB URL:", process.env.MONGODB_URL);
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Insert new data
    await User.insertMany(users);
    await Product.insertMany(products);
    console.log("Inserted dummy data");

    // Disconnect
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
