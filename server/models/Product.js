import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        unique: true,
        sparse: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Men', 'Women', 'Kids', 'Accessories']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    images: [{
        type: String
    }],
    variants: [variantSchema],
    sizes: [{
        type: String
    }],
    colors: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
