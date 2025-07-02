// pages/urunler.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiFilter, FiGrid, FiList, FiStar, FiShoppingCart, FiHeart, FiSearch, FiX } from 'react-icons/fi';

const ProductsPage = () => {
    // Ürün verileri
    const products = [
        {
            id: 1,
            name: 'Kablosuz Kulaklık Pro',
            price: 799.99,
            discountPrice: 599.99,
            category: 'Elektronik',
            rating: 4.8,
            reviews: 124,
            tags: ['yeni', 'popüler'],
            stock: 15
        },
        {
            id: 2,
            name: 'Akıllı Saat Serisi 5',
            price: 1299.99,
            discountPrice: 999.99,
            category: 'Elektronik',
            rating: 4.7,
            reviews: 98,
            tags: ['indirim'],
            stock: 8
        },
        {
            id: 3,
            name: 'Spor Ayakkabı Ultra',
            price: 499.99,
            category: 'Spor',
            rating: 4.5,
            reviews: 76,
            tags: ['yeni'],
            stock: 22
        },
        {
            id: 4,
            name: 'Laptop Çantası Premium',
            price: 299.99,
            category: 'Aksesuar',
            rating: 4.3,
            reviews: 54,
            tags: [],
            stock: 12
        },
        {
            id: 5,
            name: 'Bluetooth Hoparlör',
            price: 399.99,
            discountPrice: 349.99,
            category: 'Elektronik',
            rating: 4.6,
            reviews: 87,
            tags: ['indirim'],
            stock: 7
        },
        {
            id: 6,
            name: 'Güneş Gözlüğü Klasik',
            price: 199.99,
            category: 'Aksesuar',
            rating: 4.2,
            reviews: 43,
            tags: ['yeni'],
            stock: 30
        },
        {
            id: 7,
            name: 'Kahve Makinesi Pro',
            price: 899.99,
            category: 'Ev',
            rating: 4.9,
            reviews: 132,
            tags: ['popüler'],
            stock: 5
        },
        {
            id: 8,
            name: 'Fitness Band',
            price: 249.99,
            discountPrice: 199.99,
            category: 'Spor',
            rating: 4.0,
            reviews: 65,
            tags: ['indirim'],
            stock: 18
        }
    ];

    // Filtreleme ve sıralama state'leri
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [sortOption, setSortOption] = useState('default');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' veya 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Kategori listesi
    const categories = ['Elektronik', 'Spor', 'Aksesuar', 'Ev', 'Giyim'];

    // Fiyat aralığı için maksimum değer
    const maxPrice = Math.max(...products.map(p => p.discountPrice || p.price));

    // Filtreleme fonksiyonu
    useEffect(() => {
        let result = [...products];

        // Kategori filtreleme
        if (selectedCategories.length > 0) {
            result = result.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        // Fiyat aralığı filtreleme
        result = result.filter(product => {
            const price = product.discountPrice || product.price;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Arama filtreleme
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        }

        // Sıralama
        switch (sortOption) {
            case 'price-low':
                result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
                break;
            case 'price-high':
                result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
            default:
                // Varsayılan sıralama (orijinal sıra)
                break;
        }

        setFilteredProducts(result);
    }, [selectedCategories, priceRange, sortOption, searchQuery]);

    // Kategori seçimi
    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <>
            <Head>
                <title>Ürünler - MağazaAdı</title>
                <meta name="description" content="Geniş ürün yelpazemizde en kaliteli ürünleri keşfedin" />
            </Head>

            <main className="pt-20">
                {/* Hero Bölümü */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ürün Kataloğumuz</h1>
                            <p className="text-xl max-w-3xl mx-auto">
                                Geniş ürün yelpazemizde aradığınız kaliteyi bulun. Filtreleyin, karşılaştırın ve en uygun ürünleri keşfedin.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Ürün Filtreleme ve Listeleme */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Filtreleme Sidebar (Mobil için kapalı) */}
                            <div className={`md:w-1/4 ${mobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
                                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                                    {/* Filtre Başlık */}
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold">Filtreler</h2>
                                        <button
                                            className="md:hidden text-gray-500"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <FiX size={24} />
                                        </button>
                                    </div>

                                    {/* Arama Filtresi */}
                                    <div className="mb-8">
                                        <h3 className="font-semibold mb-3">Arama</h3>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Ürün ara..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Kategori Filtresi */}
                                    <div className="mb-8">
                                        <h3 className="font-semibold mb-3">Kategoriler</h3>
                                        <div className="space-y-2">
                                            {categories.map((category, index) => (
                                                <div key={index} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`category-${index}`}
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        checked={selectedCategories.includes(category)}
                                                        onChange={() => toggleCategory(category)}
                                                    />
                                                    <label htmlFor={`category-${index}`} className="ml-2 text-gray-700">
                                                        {category}
                                                        <span className="text-gray-400 ml-1">
                                                            ({products.filter(p => p.category === category).length})
                                                        </span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Fiyat Filtresi */}
                                    <div className="mb-8">
                                        <h3 className="font-semibold mb-3">Fiyat Aralığı</h3>
                                        <div className="space-y-4">
                                            <div className="px-1">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={maxPrice}
                                                    step="50"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>0 TL</span>
                                                <span>{priceRange[1].toFixed(2)} TL</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stok Durumu Filtresi */}
                                    <div>
                                        <h3 className="font-semibold mb-3">Stok Durumu</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="in-stock"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    defaultChecked
                                                />
                                                <label htmlFor="in-stock" className="ml-2 text-gray-700">
                                                    Stokta Var
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="out-of-stock"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                />
                                                <label htmlFor="out-of-stock" className="ml-2 text-gray-700">
                                                    Stokta Yok
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ürün Listesi */}
                            <div className="md:w-3/4">
                                {/* Üst Kontroller */}
                                <div className="bg-white rounded-xl shadow-md p-4 mb-8">
                                    <div className="flex flex-col md:flex-row justify-between items-center">
                                        <div className="flex items-center mb-4 md:mb-0">
                                            <button
                                                className="md:hidden mr-4 bg-indigo-600 text-white p-2 rounded-lg"
                                                onClick={() => setMobileFiltersOpen(true)}
                                            >
                                                <FiFilter size={20} />
                                            </button>
                                            <p className="text-gray-600">
                                                <span className="font-semibold">{filteredProducts.length}</span> ürün listeleniyor
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-gray-600">Görünüm:</span>
                                                <button
                                                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'}`}
                                                    onClick={() => setViewMode('grid')}
                                                >
                                                    <FiGrid size={20} />
                                                </button>
                                                <button
                                                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'}`}
                                                    onClick={() => setViewMode('list')}
                                                >
                                                    <FiList size={20} />
                                                </button>
                                            </div>

                                            <div className="flex items-center">
                                                <span className="mr-2 text-gray-600">Sırala:</span>
                                                <select
                                                    value={sortOption}
                                                    onChange={(e) => setSortOption(e.target.value)}
                                                    className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                >
                                                    <option value="default">Varsayılan</option>
                                                    <option value="newest">En Yeni</option>
                                                    <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                                                    <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                                                    <option value="rating">En Yüksek Puan</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ürün Listesi */}
                                {filteredProducts.length === 0 ? (
                                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                        <h3 className="text-xl font-semibold mb-4">Ürün bulunamadı</h3>
                                        <p className="text-gray-600 mb-6">Seçtiğiniz filtrelere uygun ürün bulunamadı. Lütfen farklı filtreler deneyin.</p>
                                        <button
                                            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
                                            onClick={() => {
                                                setSelectedCategories([]);
                                                setPriceRange([0, maxPrice]);
                                                setSearchQuery('');
                                            }}
                                        >
                                            Filtreleri Sıfırla
                                        </button>
                                    </div>
                                ) : viewMode === 'grid' ? (
                                    // Grid Görünüm
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} viewMode={viewMode} />
                                        ))}
                                    </div>
                                ) : (
                                    // List Görünüm
                                    <div className="space-y-6">
                                        {filteredProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} viewMode={viewMode} />
                                        ))}
                                    </div>
                                )}

                                {/* Sayfalama */}
                                {filteredProducts.length > 0 && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="inline-flex rounded-md shadow">
                                            <a href="#" className="py-2 px-4 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                                Önceki
                                            </a>
                                            <a href="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                                1
                                            </a>
                                            <a href="#" className="py-2 px-4 border border-gray-300 bg-indigo-600 text-white">
                                                2
                                            </a>
                                            <a href="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                                3
                                            </a>
                                            <a href="#" className="py-2 px-4 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                                Sonraki
                                            </a>
                                        </nav>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Öne Çıkan Kategoriler */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Kategoriler</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md overflow-hidden group relative cursor-pointer"
                                >
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold group-hover:text-indigo-600 transition">{category}</h3>
                                        <p className="text-gray-500">
                                            {products.filter(p => p.category === category).length} ürün
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
                                            İncele
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
};

// Ürün Kartı Bileşeni
const ProductCard = ({ product, viewMode }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden group ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}>
            <div className={`relative ${viewMode === 'list' ? 'md:w-1/3' : 'w-full'
                }`}>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-square" />

                {/* Etiketler */}
                <div className="absolute top-3 left-3 flex space-x-2">
                    {product.tags.includes('yeni') && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Yeni</span>
                    )}
                    {product.tags.includes('indirim') && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">İndirim</span>
                    )}
                    {product.tags.includes('popüler') && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Popüler</span>
                    )}
                </div>

                {/* Hover İşlemleri */}
                <div className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 ${viewMode === 'list' ? 'md:hidden group-hover:md:flex' : ''
                    }`}>
                    <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
                        <FiHeart size={20} />
                    </button>
                    <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
                        <FiShoppingCart size={20} />
                    </button>
                    <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
                        <FiSearch size={20} />
                    </button>
                </div>
            </div>

            <div className={`p-4 ${viewMode === 'list' ? 'md:w-2/3' : 'w-full'
                }`}>
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs text-gray-500">{product.category}</span>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-600 transition">
                            {product.name}
                        </h3>

                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ★
                                </span>
                            ))}
                            <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
                        </div>
                    </div>

                    {/* Stok Durumu */}
                    <div className="flex flex-col items-end">
                        {product.stock > 10 ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Stokta</span>
                        ) : product.stock > 0 ? (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Son {product.stock} ürün</span>
                        ) : (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Tükendi</span>
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    {product.discountPrice ? (
                        <div className="flex items-end">
                            <span className="text-xl font-bold text-indigo-600">{product.discountPrice.toFixed(2)} TL</span>
                            <span className="line-through text-gray-500 ml-2">{product.price.toFixed(2)} TL</span>
                            <span className="ml-2 text-red-600 text-sm font-medium">
                                %{Math.round((1 - product.discountPrice / product.price) * 100)} indirim
                            </span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-indigo-600">{product.price.toFixed(2)} TL</span>
                    )}
                </div>

                <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 py-2 rounded-md text-sm font-medium transition flex items-center justify-center">
                        <FiShoppingCart className="mr-1" />
                        <span>Sepete Ekle</span>
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                        <FiHeart />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;