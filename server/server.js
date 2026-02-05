import express from 'express';
import path from "path";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import wishlistRoutes from './routes/wishlist.js';
import reviewRoutes from './routes/reviews.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL // Will be set in Render environment
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'E-Commerce API is running' });
});

// MongoDB connection
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));
      
        app.get("*", (req, res) => {
          res.sendFile(
            path.resolve(__dirname, "../client/dist/index.html")
          );
        });
      }
      