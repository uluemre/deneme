/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import FavoriteButton from "../../components/FavoriteButton";

interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    discount: number;
    final_price: number;
    category: string;
    stock: number;
    rating: number;
    num_reviews: number;
    image_url?: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
    const [, setShowNotification] = useState(false);
    const [, setNotificationProduct] = useState("");

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const addToCart = (productId: string, productName: string) => {
        setCartItems((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));

        setNotificationProduct(productName);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };


    const decrementCart = (productId: string) => {
        setCartItems((prev) => {
            const currentCount = prev[productId] || 0;
            if (currentCount <= 1) {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
            } else {
                return {
                    ...prev,
                    [productId]: currentCount - 1,
                };
            }
        });
    };

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 relative">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">Premium Ürün Kataloğu</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">En kaliteli ürünlerimizle ihtiyaçlarınızı karşılamak için buradayız.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
                    >
                        <div className="relative">
                            <div className="absolute top-4 right-4 z-10">
                                <FavoriteButton productId={product.id} initiallyFavorited={false} />
                            </div>

                            {product.discount > 0 && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                                    %{product.discount} İNDİRİM
                                </div>
                            )}

                            <div className="absolute top-4 right-4 z-10 bg-white text-gray-500 rounded-full p-1 shadow-md">
                                <FavoriteButton productId={product.id} initiallyFavorited={false} />
                            </div>


                            {product.image_url ? (
                                <div className="h-60 flex items-center justify-center p-5 bg-gradient-to-br from-gray-50 to-gray-100">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            ) : (
                                <div className="h-60 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                    <span className="text-gray-400">Resim Yok</span>
                                </div>
                            )}
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                            <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium mb-2">
                                {product.category}
                            </span>

                            <h2 className="font-bold text-xl text-gray-800 mb-1">{product.name}</h2>
                            <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

                            <div className="flex items-center mb-4">
                                <div className="flex mr-2">{renderStars(product.rating)}</div>
                                <span className="text-sm text-gray-500">({product.num_reviews})</span>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">₺{product.final_price.toFixed(2)}</p>
                                    {product.discount > 0 && (
                                        <p className="text-sm text-gray-500 line-through">₺{product.price.toFixed(2)}</p>
                                    )}
                                </div>

                                <div className={`text-xs font-medium px-3 py-1.5 rounded-full ${product.stock > 10
                                    ? "bg-green-100 text-green-800"
                                    : product.stock > 0
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}>
                                    {product.stock > 10 ? "Stokta" : product.stock > 0 ? "Son Ürünler" : "Stok Yok"}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {cartItems[product.id] ? (
                                    <div className="flex w-full">
                                        <button
                                            onClick={() => decrementCart(product.id)}
                                            className="w-1/4 bg-red-50 text-red-600 hover:bg-red-100 font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <div className="w-2/4 flex items-center justify-center bg-gray-50 font-bold text-gray-800 rounded-lg">
                                            {cartItems[product.id]} Adet
                                        </div>
                                        <button
                                            onClick={() => (product.id)}
                                            className="w-1/4 bg-green-50 text-green-600 hover:bg-green-100 font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(product.id, product.name)}
                                        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 shadow-md hover:shadow-lg ${product.stock > 0
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                                            : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                        disabled={product.stock <= 0}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {product.stock > 0 ? "Sepete Ekle" : "Stokta Yok"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
