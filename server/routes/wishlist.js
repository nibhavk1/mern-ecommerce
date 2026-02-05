import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get wishlist
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add to wishlist
router.post('/', auth, async (req, res) => {
    try {
        const { productId } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        user.wishlist.push(productId);
        await user.save();

        res.json({ message: 'Product added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Remove from wishlist
router.delete('/:productId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.wishlist = user.wishlist.filter(
            id => id.toString() !== req.params.productId
        );
        await user.save();

        res.json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
