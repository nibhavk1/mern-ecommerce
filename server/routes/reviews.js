import express from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create review
router.post('/', auth, async (req, res) => {
    try {
        const { productId, rating, comment, userName } = req.body;

        const review = new Review({
            productId,
            userId: req.user.id,
            userName,
            rating,
            comment
        });

        await review.save();

        // Update product rating
        const reviews = await Review.find({ productId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await Product.findByIdAndUpdate(productId, {
            rating: avgRating.toFixed(1),
            reviewCount: reviews.length
        });

        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get product reviews
router.get('/product/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId })
            .sort({ createdAt: -1 })
            .populate('userId', 'name');

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
