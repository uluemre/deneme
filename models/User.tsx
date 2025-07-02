// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    cart: { productId: mongoose.Types.ObjectId; quantity: number }[];
    favorites: { productId: mongoose.Types.ObjectId }[];
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cart: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 }
            }
        ],
        favorites: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
