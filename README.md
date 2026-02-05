# Fashion Store - MERN E-Commerce Application

A full-stack e-commerce clothing store built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🌟 Features

### Customer Features
- **User Authentication**: Secure registration and login with JWT
- **Product Browsing**: Browse products by category with advanced filtering
- **Product Search**: Search products by name and description
- **Product Details**: View detailed product information with size/color selection
- **Shopping Cart**: Add items, update quantities, manage cart
- **Wishlist**: Save favorite products for later
- **Checkout**: Complete orders with shipping address management
- **Order Tracking**: View order history and status
- **Product Reviews**: Submit and view product reviews
- **User Profile**: Manage personal information and addresses

### Admin Features
- **Admin Dashboard**: Overview of orders, products, and revenue
- **Product Management**: Add, edit, delete products with variants
- **Inventory Management**: Track and update stock levels with low-stock alerts
- **Order Management**: View all orders and update order status

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Configure environment variables:**
   
   Server `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```
   
   Client `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Seed the database:**
   ```bash
   cd server
   npm run seed
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the frontend (in new terminal):**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:5173

## 👤 Demo Credentials

### Admin Account
- Email: `admin@fashionstore.com`
- Password: `admin123`

### Customer Account
- Email: `customer@example.com`
- Password: `customer123`

## 📁 Project Structure

```
MERNStackeCommerce/
├── server/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & validation
│   ├── server.js        # Express server
│   └── seed.js          # Database seeding script
├── client/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React contexts
│   │   ├── services/    # API services
│   │   ├── styles/      # CSS files
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── index.html
└── README.md
```

## 🛠️ Built With

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & bcrypt
- **Build Tool**: Vite

## 📦 Available Scripts

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Features Implemented

✅ User authentication (Register/Login)
✅ Role-based access control (Customer/Admin)
✅ Product catalog with filtering
✅ Shopping cart functionality
✅ Wishlist management
✅ Order processing with stock deduction
✅ Order tracking
✅ Product reviews and ratings
✅ Admin dashboard
✅ Product management (CRUD)
✅ Inventory management with stock alerts
✅ Order management
✅ Responsive design
✅ Modern UI with premium aesthetics

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

Feel free to contribute or report issues!
