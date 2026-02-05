import express from 'express';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

// Get all products with filters
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, size, color, search } = req.query;

        let query = { isActive: true };

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (size) {
            query.sizes = { $in: [size] };
        }

        if (color) {
            query.colors = { $in: [color] };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create product (Admin only)
router.post('/', auth, admin, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update product (Admin only)
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete product (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update stock (Admin only)
router.put('/:id/stock', auth, admin, async (req, res) => {
    try {
        const { size, color, stockQuantity } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const variant = product.variants.find(v => v.size === size && v.color === color);
        if (variant) {
            variant.stockQuantity = stockQuantity;
            await product.save();
            res.json({ message: 'Stock updated successfully', product });
        } else {
            res.status(404).json({ message: 'Variant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
