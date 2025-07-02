// models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description?: string;
    brand?: string;
    price: number;
    discount?: number;
    final_price?: number;
    category?: string;
    stock?: number;
    rating?: number;
    num_reviews?: number;
    image_url?: string;
    features?: string[];
    created_at?: Date;
    updated_at?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: String,
        brand: String,
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        final_price: Number,
        category: String,
        stock: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        num_reviews: { type: Number, default: 0 },
        image_url: String,
        features: [String]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
