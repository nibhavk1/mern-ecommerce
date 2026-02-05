import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Review from './models/Review.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Review.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@fashionstore.com',
            password: hashedPassword,
            role: 'admin',
            phone: '1234567890'
        });
        console.log('Admin user created: admin@fashionstore.com / admin123');

        // Create sample customer
        const customerPassword = await bcrypt.hash('customer123', 10);
        const customer = await User.create({
            name: 'John Doe',
            email: 'customer@example.com',
            password: customerPassword,
            role: 'customer',
            phone: '0987654321',
            addresses: [{
                addressLine1: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
                isDefault: true
            }]
        });
        console.log('Customer created: customer@example.com / customer123');

        // Create sample products (28 products across all categories)
        const products = [
            // MEN'S CLOTHING (10 products)
            {
                name: 'Classic White T-Shirt',
                description: 'Premium cotton t-shirt with a modern fit. Perfect for casual everyday wear.',
                category: 'Men',
                price: 29.99,
                images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['White', 'Black', 'Gray'],
                variants: [
                    { size: 'S', color: 'White', sku: 'CWT-S-W', stockQuantity: 50 },
                    { size: 'M', color: 'White', sku: 'CWT-M-W', stockQuantity: 100 },
                    { size: 'L', color: 'White', sku: 'CWT-L-W', stockQuantity: 75 },
                    { size: 'XL', color: 'White', sku: 'CWT-XL-W', stockQuantity: 30 }
                ],
                rating: 4.5,
                reviewCount: 0
            },
            {
                name: 'Slim Fit Denim Jeans',
                description: 'Comfortable stretch denim jeans with a modern slim fit. Made from premium quality fabric.',
                category: 'Men',
                price: 79.99,
                images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
                sizes: ['30', '32', '34', '36'],
                colors: ['Blue', 'Black'],
                variants: [
                    { size: '30', color: 'Blue', sku: 'SFD-30-B', stockQuantity: 40 },
                    { size: '32', color: 'Blue', sku: 'SFD-32-B', stockQuantity: 80 },
                    { size: '34', color: 'Blue', sku: 'SFD-34-B', stockQuantity: 70 }
                ],
                rating: 4.7,
                reviewCount: 0
            },
            {
                name: 'Leather Bomber Jacket',
                description: 'Classic bomber jacket in genuine leather. Timeless style with modern details.',
                category: 'Men',
                price: 299.99,
                images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'],
                sizes: ['M', 'L', 'XL'],
                colors: ['Brown', 'Black'],
                variants: [
                    { size: 'M', color: 'Brown', sku: 'LBJ-M-BR', stockQuantity: 25 },
                    { size: 'L', color: 'Brown', sku: 'LBJ-L-BR', stockQuantity: 30 },
                    { size: 'XL', color: 'Black', sku: 'LBJ-XL-BK', stockQuantity: 20 }
                ],
                rating: 4.8,
                reviewCount: 0
            },
            {
                name: 'Casual Button-Down Shirt',
                description: 'Versatile cotton shirt perfect for work or weekend. Breathable and easy to care for.',
                category: 'Men',
                price: 49.99,
                images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['White', 'Blue', 'Gray'],
                variants: [
                    { size: 'M', color: 'White', sku: 'CBS-M-W', stockQuantity: 60 },
                    { size: 'L', color: 'Blue', sku: 'CBS-L-B', stockQuantity: 55 },
                    { size: 'XL', color: 'Gray', sku: 'CBS-XL-G', stockQuantity: 40 }
                ],
                rating: 4.3,
                reviewCount: 0
            },
            {
                name: 'Athletic Joggers',
                description: 'Comfortable joggers with moisture-wicking fabric. Perfect for workouts or lounging.',
                category: 'Men',
                price: 59.99,
                images: ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Black', 'Gray', 'Navy'],
                variants: [
                    { size: 'M', color: 'Black', sku: 'AJ-M-BK', stockQuantity: 70 },
                    { size: 'L', color: 'Gray', sku: 'AJ-L-G', stockQuantity: 65 },
                    { size: 'XL', color: 'Navy', sku: 'AJ-XL-N', stockQuantity: 45 }
                ],
                rating: 4.6,
                reviewCount: 0
            },
            {
                name: 'Formal Dress Pants',
                description: 'Tailored dress pants for professional settings. Wrinkle-resistant and comfortable.',
                category: 'Men',
                price: 89.99,
                images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500'],
                sizes: ['30', '32', '34', '36'],
                colors: ['Black', 'Charcoal', 'Navy'],
                variants: [
                    { size: '32', color: 'Black', sku: 'FDP-32-BK', stockQuantity: 50 },
                    { size: '34', color: 'Charcoal', sku: 'FDP-34-CH', stockQuantity: 45 },
                    { size: '36', color: 'Navy', sku: 'FDP-36-N', stockQuantity: 35 }
                ],
                rating: 4.5,
                reviewCount: 0
            },
            {
                name: 'Wool Blend Sweater',
                description: 'Cozy wool blend sweater for cold weather. Classic crew neck design.',
                category: 'Men',
                price: 69.99,
                images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'],
                sizes: ['M', 'L', 'XL'],
                colors: ['Navy', 'Burgundy', 'Olive'],
                variants: [
                    { size: 'M', color: 'Navy', sku: 'WBS-M-N', stockQuantity: 55 },
                    { size: 'L', color: 'Burgundy', sku: 'WBS-L-BU', stockQuantity: 50 },
                    { size: 'XL', color: 'Olive', sku: 'WBS-XL-O', stockQuantity: 40 }
                ],
                rating: 4.7,
                reviewCount: 0
            },
            {
                name: 'Performance Polo Shirt',
                description: 'Moisture-wicking polo shirt ideal for golf or business casual.',
                category: 'Men',
                price: 44.99,
                images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['White', 'Navy', 'Red'],
                variants: [
                    { size: 'M', color: 'White', sku: 'PPS-M-W', stockQuantity: 65 },
                    { size: 'L', color: 'Navy', sku: 'PPS-L-N', stockQuantity: 60 },
                    { size: 'XL', color: 'Red', sku: 'PPS-XL-R', stockQuantity: 35 }
                ],
                rating: 4.4,
                reviewCount: 0
            },
            {
                name: 'Denim Trucker Jacket',
                description: 'Classic denim jacket with authentic vintage wash. A wardrobe essential.',
                category: 'Men',
                price: 89.99,
                images: ['https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500'],
                sizes: ['M', 'L', 'XL'],
                colors: ['Light Blue', 'Dark Blue'],
                variants: [
                    { size: 'M', color: 'Light Blue', sku: 'DTJ-M-LB', stockQuantity: 40 },
                    { size: 'L', color: 'Dark Blue', sku: 'DTJ-L-DB', stockQuantity: 45 },
                    { size: 'XL', color: 'Dark Blue', sku: 'DTJ-XL-DB', stockQuantity: 30 }
                ],
                rating: 4.6,
                reviewCount: 0
            },
            {
                name: 'Cargo Shorts',
                description: 'Durable cotton cargo shorts with multiple pockets. Perfect for summer.',
                category: 'Men',
                price: 39.99,
                images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500'],
                sizes: ['30', '32', '34', '36'],
                colors: ['Khaki', 'Olive', 'Navy'],
                variants: [
                    { size: '32', color: 'Khaki', sku: 'CS-32-K', stockQuantity: 70 },
                    { size: '34', color: 'Olive', sku: 'CS-34-O', stockQuantity: 65 },
                    { size: '36', color: 'Navy', sku: 'CS-36-N', stockQuantity: 50 }
                ],
                rating: 4.2,
                reviewCount: 0
            },

            // WOMEN'S CLOTHING (10 products)
            {
                name: 'Floral Summer Dress',
                description: 'Light and breezy floral dress perfect for summer. Features a flattering A-line silhouette.',
                category: 'Women',
                price: 89.99,
                images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Pink', 'Blue', 'Yellow'],
                variants: [
                    { size: 'S', color: 'Pink', sku: 'FSD-S-P', stockQuantity: 60 },
                    { size: 'M', color: 'Blue', sku: 'FSD-M-B', stockQuantity: 50 },
                    { size: 'L', color: 'Yellow', sku: 'FSD-L-Y', stockQuantity: 40 }
                ],
                rating: 4.8,
                reviewCount: 0
            },
            {
                name: 'Elegant Evening Gown',
                description: 'Stunning floor-length evening gown with exquisite detailing. Perfect for special occasions.',
                category: 'Women',
                price: 249.99,
                images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Black', 'Navy', 'Burgundy'],
                variants: [
                    { size: 'S', color: 'Black', sku: 'EEG-S-BK', stockQuantity: 25 },
                    { size: 'M', color: 'Navy', sku: 'EEG-M-N', stockQuantity: 30 },
                    { size: 'L', color: 'Burgundy', sku: 'EEG-L-BU', stockQuantity: 20 }
                ],
                rating: 4.9,
                reviewCount: 0
            },
            {
                name: 'High-Waisted Skinny Jeans',
                description: 'Flattering high-waisted jeans with stretch denim for all-day comfort.',
                category: 'Women',
                price: 69.99,
                images: ['https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=500'],
                sizes: ['24', '26', '28', '30'],
                colors: ['Dark Blue', 'Black', 'Light Blue'],
                variants: [
                    { size: '26', color: 'Dark Blue', sku: 'HWSJ-26-DB', stockQuantity: 55 },
                    { size: '28', color: 'Black', sku: 'HWSJ-28-BK', stockQuantity: 60 },
                    { size: '30', color: 'Light Blue', sku: 'HWSJ-30-LB', stockQuantity: 45 }
                ],
                rating: 4.7,
                reviewCount: 0
            },
            {
                name: 'Cashmere Cardigan',
                description: 'Luxurious 100% cashmere cardigan. Soft, warm, and timeless.',
                category: 'Women',
                price: 149.99,
                images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Beige', 'Gray', 'Pink'],
                variants: [
                    { size: 'S', color: 'Beige', sku: 'CC-S-BE', stockQuantity: 35 },
                    { size: 'M', color: 'Gray', sku: 'CC-M-G', stockQuantity: 40 },
                    { size: 'L', color: 'Pink', sku: 'CC-L-P', stockQuantity: 30 }
                ],
                rating: 4.9,
                reviewCount: 0
            },
            {
                name: 'Silk Blouse',
                description: 'Elegant silk blouse with delicate detailing. Perfect for office or evening wear.',
                category: 'Women',
                price: 79.99,
                images: ['https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['White', 'Champagne', 'Black'],
                variants: [
                    { size: 'S', color: 'White', sku: 'SB-S-W', stockQuantity: 50 },
                    { size: 'M', color: 'Champagne', sku: 'SB-M-CH', stockQuantity: 45 },
                    { size: 'L', color: 'Black', sku: 'SB-L-BK', stockQuantity: 40 }
                ],
                rating: 4.6,
                reviewCount: 0
            },
            {
                name: 'Yoga Leggings',
                description: 'High-performance leggings with four-way stretch and moisture-wicking fabric.',
                category: 'Women',
                price: 54.99,
                images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Black', 'Navy', 'Purple'],
                variants: [
                    { size: 'S', color: 'Black', sku: 'YL-S-BK', stockQuantity: 80 },
                    { size: 'M', color: 'Navy', sku: 'YL-M-N', stockQuantity: 75 },
                    { size: 'L', color: 'Purple', sku: 'YL-L-P', stockQuantity: 60 }
                ],
                rating: 4.5,
                reviewCount: 0
            },
            {
                name: 'Pleated Midi Skirt',
                description: 'Feminine pleated skirt with elastic waistband. Versatile and comfortable.',
                category: 'Women',
                price: 59.99,
                images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Black', 'Navy', 'Beige'],
                variants: [
                    { size: 'S', color: 'Black', sku: 'PMS-S-BK', stockQuantity: 55 },
                    { size: 'M', color: 'Navy', sku: 'PMS-M-N', stockQuantity: 50 },
                    { size: 'L', color: 'Beige', sku: 'PMS-L-BE', stockQuantity: 45 }
                ],
                rating: 4.4,
                reviewCount: 0
            },
            {
                name: 'Trench Coat',
                description: 'Classic double-breasted trench coat. Water-resistant and stylish.',
                category: 'Women',
                price: 189.99,
                images: ['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500'],
                sizes: ['S', 'M', 'L'],
                colors: ['Beige', 'Navy', 'Black'],
                variants: [
                    { size: 'S', color: 'Beige', sku: 'TC-S-BE', stockQuantity: 30 },
                    { size: 'M', color: 'Navy', sku: 'TC-M-N', stockQuantity: 35 },
                    { size: 'L', color: 'Black', sku: 'TC-L-BK', stockQuantity: 25 }
                ],
                rating: 4.8,
                reviewCount: 0
            },
            {
                name: 'Linen Palazzo Pants',
                description: 'Breezy linen pants with wide legs. Perfect for summer comfort.',
                category: 'Women',
                price: 64.99,
                images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['White', 'Tan', 'Olive'],
                variants: [
                    { size: 'S', color: 'White', sku: 'LPP-S-W', stockQuantity: 50 },
                    { size: 'M', color: 'Tan', sku: 'LPP-M-T', stockQuantity: 45 },
                    { size: 'L', color: 'Olive', sku: 'LPP-L-O', stockQuantity: 40 }
                ],
                rating: 4.3,
                reviewCount: 0
            },
            {
                name: 'Wrap Maxi Dress',
                description: 'Flattering wrap dress with adjustable tie. Flows beautifully when walking.',
                category: 'Women',
                price: 94.99,
                images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Red', 'Green', 'Blue'],
                variants: [
                    { size: 'S', color: 'Red', sku: 'WMD-S-R', stockQuantity: 40 },
                    { size: 'M', color: 'Green', sku: 'WMD-M-G', stockQuantity: 45 },
                    { size: 'L', color: 'Blue', sku: 'WMD-L-B', stockQuantity: 35 }
                ],
                rating: 4.7,
                reviewCount: 0
            },

            // KIDS CLOTHING (5 products)
            {
                name: 'Kids Graphic Hoodie',
                description: 'Soft and cozy hoodie with fun graphics. Perfect for active kids.',
                category: 'Kids',
                price: 39.99,
                images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500'],
                sizes: ['4', '6', '8', '10', '12'],
                colors: ['Red', 'Blue', 'Green'],
                variants: [
                    { size: '6', color: 'Red', sku: 'KGH-6-R', stockQuantity: 50 },
                    { size: '8', color: 'Blue', sku: 'KGH-8-B', stockQuantity: 45 },
                    { size: '10', color: 'Green', sku: 'KGH-10-G', stockQuantity: 40 }
                ],
                rating: 4.4,
                reviewCount: 0
            },
            {
                name: 'Kids Denim Overalls',
                description: 'Cute and durable denim overalls. Great for playtime.',
                category: 'Kids',
                price: 49.99,
                images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500'],
                sizes: ['4', '6', '8', '10'],
                colors: ['Blue', 'Black'],
                variants: [
                    { size: '6', color: 'Blue', sku: 'KDO-6-B', stockQuantity: 45 },
                    { size: '8', color: 'Blue', sku: 'KDO-8-B', stockQuantity: 50 },
                    { size: '10', color: 'Black', sku: 'KDO-10-BK', stockQuantity: 35 }
                ],
                rating: 4.5,
                reviewCount: 0
            },
            {
                name: 'Kids Raincoat',
                description: 'Waterproof raincoat with hood. Keeps kids dry in wet weather.',
                category: 'Kids',
                price: 44.99,
                images: ['https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=500'],
                sizes: ['4', '6', '8', '10'],
                colors: ['Yellow', 'Red', 'Blue'],
                variants: [
                    { size: '6', color: 'Yellow', sku: 'KRC-6-Y', stockQuantity: 40 },
                    { size: '8', color: 'Red', sku: 'KRC-8-R', stockQuantity: 38 },
                    { size: '10', color: 'Blue', sku: 'KRC-10-B', stockQuantity: 35 }
                ],
                rating: 4.6,
                reviewCount: 0
            },
            {
                name: 'Kids Sports Shorts',
                description: 'Lightweight athletic shorts for active play and sports.',
                category: 'Kids',
                price: 24.99,
                images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500'],
                sizes: ['4', '6', '8', '10', '12'],
                colors: ['Black', 'Navy', 'Red'],
                variants: [
                    { size: '6', color: 'Black', sku: 'KSS-6-BK', stockQuantity: 60 },
                    { size: '8', color: 'Navy', sku: 'KSS-8-N', stockQuantity: 55 },
                    { size: '10', color: 'Red', sku: 'KSS-10-R', stockQuantity: 50 }
                ],
                rating: 4.3,
                reviewCount: 0
            },
            {
                name: 'Kids Winter Puffer Jacket',
                description: 'Warm insulated jacket for cold weather. Water-resistant outer shell.',
                category: 'Kids',
                price: 79.99,
                images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500'],
                sizes: ['4', '6', '8', '10', '12'],
                colors: ['Navy', 'Pink', 'Black'],
                variants: [
                    { size: '6', color: 'Navy', sku: 'KWPJ-6-N', stockQuantity: 35 },
                    { size: '8', color: 'Pink', sku: 'KWPJ-8-P', stockQuantity: 40 },
                    { size: '10', color: 'Black', sku: 'KWPJ-10-BK', stockQuantity: 30 }
                ],
                rating: 4.7,
                reviewCount: 0
            },

            // ACCESSORIES (3 products)
            {
                name: 'Leather Crossbody Bag',
                description: 'Elegant leather crossbody bag with adjustable strap. Perfect for everyday use.',
                category: 'Accessories',
                price: 129.99,
                images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500'],
                sizes: ['One Size'],
                colors: ['Brown', 'Black', 'Tan'],
                variants: [
                    { size: 'One Size', color: 'Brown', sku: 'LCB-OS-BR', stockQuantity: 45 },
                    { size: 'One Size', color: 'Black', sku: 'LCB-OS-BK', stockQuantity: 55 },
                    { size: 'One Size', color: 'Tan', sku: 'LCB-OS-T', stockQuantity: 40 }
                ],
                rating: 4.6,
                reviewCount: 0
            },
            {
                name: 'Designer Sunglasses',
                description: 'UV-protected premium sunglasses with polarized lenses.',
                category: 'Accessories',
                price: 159.99,
                images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
                sizes: ['One Size'],
                colors: ['Black', 'Tortoise', 'Gold'],
                variants: [
                    { size: 'One Size', color: 'Black', sku: 'DS-OS-BK', stockQuantity: 50 },
                    { size: 'One Size', color: 'Tortoise', sku: 'DS-OS-T', stockQuantity: 40 },
                    { size: 'One Size', color: 'Gold', sku: 'DS-OS-G', stockQuantity: 35 }
                ],
                rating: 4.8,
                reviewCount: 0
            },
            {
                name: 'Wool Fedora Hat',
                description: 'Classic fedora hat made from premium wool felt. Adds sophistication to any outfit.',
                category: 'Accessories',
                price: 64.99,
                images: ['https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=500'],
                sizes: ['S', 'M', 'L'],
                colors: ['Black', 'Gray', 'Brown'],
                variants: [
                    { size: 'M', color: 'Black', sku: 'WFH-M-BK', stockQuantity: 40 },
                    { size: 'M', color: 'Gray', sku: 'WFH-M-G', stockQuantity: 45 },
                    { size: 'L', color: 'Brown', sku: 'WFH-L-BR', stockQuantity: 35 }
                ],
                rating: 4.5,
                reviewCount: 0
            }
        ];

        const createdProducts = await Product.insertMany(products);
        console.log(`Created ${createdProducts.length} sample products`);

        // Create sample reviews
        const reviews = [
            {
                productId: createdProducts[0]._id,
                userId: customer._id,
                userName: 'John Doe',
                rating: 5,
                comment: 'Great quality t-shirt! Fits perfectly and very comfortable.'
            },
            {
                productId: createdProducts[1]._id,
                userId: customer._id,
                userName: 'John Doe',
                rating: 4,
                comment: 'Nice jeans, good fit. Slightly expensive but worth it.'
            }
        ];

        await Review.insertMany(reviews);
        console.log('Created sample reviews');

        console.log('\n✅ Database seeded successfully!');
        console.log('\nLogin credentials:');
        console.log('Admin: admin@fashionstore.com / admin123');
        console.log('Customer: customer@example.com / customer123');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();