# AI-Powered E-Commerce Platform

A full-stack e-commerce platform with an integrated AI assistant that provides dynamic responses based on inventory and product information. Built with modern web technologies and best practices.
![Screenshot 2025-05-10 204940](https://github.com/user-attachments/assets/60e0d5a5-985e-49cc-950a-80ea961fa3b3)

<!-- Add screenshot of homepage with featured products and AI chat widget here -->

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

![Screenshot 2025-05-10 205939](https://github.com/user-attachments/assets/ca1b1dcd-5683-4674-aa2b-908c1592b030)


<!-- Add screenshot of product listing and search interface here -->

### Admin Features
- Admin dashboard
- Product management (CRUD operations)
- Inventory management
- Order management
- User management
- AI assistant configuration
- Product embedding updates
- Analytics and reporting
![Screenshot 2025-05-10 205138](https://github.com/user-attachments/assets/1e8e6258-6f70-4ff8-a24a-6a181829928d)
![Screenshot 2025-05-10 205804](https://github.com/user-attachments/assets/15fbbe14-247a-4a6f-af6e-a1f1ba590e0e)

<!-- Add screenshot of admin dashboard with analytics here -->

### AI Assistant Features
- Real-time chat interface
- Product recommendations
- Inventory status queries
- Price and availability information
- Category and brand filtering
- Dynamic response generation
- Context-aware conversations

![Screenshot 2025-05-10 205404](https://github.com/user-attachments/assets/c4c56490-2c7e-4337-9f6d-e280f429d48d)

<!-- Add screenshot of AI chat interface with product recommendations here -->

## Authentication

### User Authentication
1. Register: Create a new account with email and password
2. Login: Access your account with credentials
3. Protected routes require authentication

### Admin Authentication
1. Admin login with special credentials (ID: divyamadmin@gmail.com Password: admin123)
2. Access to admin dashboard and features
3. Secure admin-only routes

![Screenshot 2025-05-10 205459](https://github.com/user-attachments/assets/438c3573-96f2-44ce-b61d-915a5cfa7a25)


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

<!-- Add screenshot of AI assistant handling complex product queries here -->

The assistant's knowledge base is automatically updated when:
- New products are added
- Product information is modified
- Admin manually triggers an update
![Screenshot 2025-05-10 205659](https://github.com/user-attachments/assets/dc21a6b2-2865-40aa-b223-cbc6f9fdad8a)

<!-- Add screenshot of admin updating AI embeddings here -->

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
