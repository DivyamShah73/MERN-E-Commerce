# AI-Powered E-Commerce Platform

A full-stack e-commerce platform with an integrated AI assistant that provides dynamic responses based on inventory and product information. Built with modern web technologies and best practices.

## Overview

This e-commerce platform combines a robust shopping experience with an intelligent AI assistant that helps customers find products and get instant answers to their queries. The AI assistant is trained on the current product catalog and can provide personalized recommendations and information.

## Tech Stack

### Frontend
- React 18
- Redux Toolkit for state management
- React Router for navigation
- TailwindCSS for styling
- Radix UI components
- Vite as build tool

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cookie-based session management

### AI Integration
- Cohere AI for natural language processing
- Product embeddings for semantic search
- Dynamic context generation based on inventory

### Additional Services
- Cloudinary for image management
- PayPal integration for payments
- CORS enabled for secure cross-origin requests

## Directory Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store and slices
│   │   ├── api/          # API integration
│   │   └── lib/          # Utility functions
│   └── public/           # Static assets
│
├── server/                # Backend Node.js application
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── services/        # Business logic
│   └── helpers/         # Utility functions
```

## Features

### User Features
- User authentication (register/login)
- Product browsing and searching
- Category-based navigation
- Shopping cart management
- Secure checkout process
- Order history and tracking
- Product reviews and ratings
- Address management
- PayPal integration for payments

### Admin Features
- Admin dashboard
- Product management (CRUD operations)
- Inventory management
- Order management
- User management
- AI assistant configuration
- Product embedding updates
- Analytics and reporting

### AI Assistant Features
- Real-time chat interface
- Product recommendations
- Inventory status queries
- Price and availability information
- Category and brand filtering
- Dynamic response generation
- Context-aware conversations

## Authentication

### User Authentication
1. Register: Create a new account with email and password
2. Login: Access your account with credentials
3. Protected routes require authentication

### Admin Authentication
1. Admin login with special credentials
2. Access to admin dashboard and features
3. Secure admin-only routes

<!-- Add screenshot of login UI here -->

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Cohere AI API key
- Cloudinary account
- PayPal developer account

### Environment Variables
Create `.env` files in both client and server directories:

```env
# Server .env
MONGODB_URL=your_mongodb_url
JWT_SECRET_KEY=your_jwt_secret
COHERE_API_KEY=your_cohere_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
```

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Start the development servers:
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/check-auth` - Verify authentication

### Products
- `GET /api/shop/products` - Get all products
- `GET /api/shop/products/:id` - Get product details
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

### Orders
- `POST /api/shop/orders` - Create order
- `GET /api/shop/orders` - Get user orders
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/:id` - Update order status (admin)

### AI Assistant
- `POST /api/chat` - Send message to AI assistant
- `POST /api/chat/update-embeddings` - Update product embeddings (admin)
- `GET /api/chat/list-models` - List available AI models

## AI Assistant Functionality

The AI assistant is integrated throughout the platform and can be accessed via the chat widget in the bottom-right corner of the interface. It uses Cohere's AI models to:

1. Process natural language queries
2. Search through product embeddings
3. Generate context-aware responses
4. Provide product recommendations
5. Answer inventory-related questions

The assistant's knowledge base is automatically updated when:
- New products are added
- Product information is modified
- Admin manually triggers an update

<!-- Add screenshot of chat interface here -->

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email divyamshah04@gmail.com or open an issue in the repository. 
