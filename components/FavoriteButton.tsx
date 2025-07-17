'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
    productId: string;
    initiallyFavorited: boolean;
}

export default function FavoriteButton({ productId, initiallyFavorited }: FavoriteButtonProps) {
    const [favorited, setFavorited] = useState(initiallyFavorited);

    const toggleFavorite = async () => {
        const res = await fetch('/api/favorite', {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            setFavorited(!favorited);
        }
    };

    return (
        <button onClick={toggleFavorite} className="text-red-500 hover:scale-110 transition-transform">
            <Heart fill={favorited ? 'currentColor' : 'none'} className="w-6 h-6" />
        </button>
    );
}
