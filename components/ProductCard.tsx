import FavoriteButton from './FavoriteButton';

interface Product {
    id: string;
    name: string;
    // diğer alanlar
}

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            {/* Favori butonu */}
            <FavoriteButton productId={product.id} initiallyFavorited={false} />
        </div>
    );
}
