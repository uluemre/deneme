// pages/index.js
import React from 'react';
import Head from 'next/head';
import Categories from '@/components/Categories';

const HomePage = () => {
  // Örnek ürün verileri
  const featuredProducts = [
    {
      id: 1,
      name: 'Kablosuz Kulaklık Pro',
      price: 799.99,
      discountPrice: 599.99,
      image: '/images/headphone.jpg',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Akıllı Saat Serisi 5',
      price: 1299.99,
      discountPrice: 999.99,
      image: '/images/smartwatch.jpg',
      rating: 4.7,
      reviews: 98
    },
    {
      id: 3,
      name: 'Spor Ayakkabı Ultra',
      price: 499.99,
      image: '/images/shoes.jpg',
      rating: 4.5,
      reviews: 76
    },
    {
      id: 4,
      name: 'Laptop Çantası Premium',
      price: 299.99,
      image: '/images/bag.jpg',
      rating: 4.3,
      reviews: 54
    }
  ];

  // Kategoriler
  const categories = [
    { id: 1, name: 'Elektronik', image: '/images/electronics.jpg', products: 243 },
    { id: 2, name: 'Giyim', image: '/images/clothing.jpg', products: 176 },
    { id: 3, name: 'Ev & Yaşam', image: '/images/home.jpg', products: 132 },
    { id: 4, name: 'Spor', image: '/images/sports.jpg', products: 98 }
  ];

  // Müşteri yorumları
  const testimonials = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      role: 'Premium Müşteri',
      content: 'Ürün kalitesi ve kargo hızı beni çok etkiledi. Artık tüm alışverişlerimi buradan yapıyorum.',
      rating: 5
    },
    {
      id: 2,
      name: 'Zeynep Kaya',
      role: 'Sık Alışveriş Yapan',
      content: 'Müşteri hizmetleri gerçekten çok ilgili. Sorunumu hızlıca çözdüler, kesinlikle tavsiye ederim.',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      role: 'Yeni Müşteri',
      content: 'İlk alışverişimde indirim kuponuyla harika bir fiyata ürün aldım. Çok memnun kaldım.',
      rating: 5
    }
  ];

  return (
    <>
      <Head>
        <title>UluTek - En İyi Alışveriş Deneyimi</title>
        <meta name="description" content="Binlerce kaliteli ürünü uygun fiyatlarla bulabileceğiniz online alışveriş platformu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  En İyi Ürünler, <span className="text-amber-400">En Uygun Fiyatlarla</span>
                </h1>
                <p className="text-xl mb-8 max-w-xl">
                  Binlerce kaliteli ürünü uygun fiyatlarla bulabileceğiniz adres. Hemen alışverişe başlayın!
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg text-lg transition">
                    Alışverişe Başla
                  </button>
                  <button className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-lg transition">
                    Kampanyaları İncele
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Özellikler */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: '🚚', title: 'Hızlı Kargo', desc: 'Siparişleriniz 24 saatte kargoda' },
                { icon: '💳', title: 'Güvenli Ödeme', desc: '256 bit SSL ile güvenli alışveriş' },
                { icon: '🔄', title: 'Kolay İade', desc: '30 gün içinde ücretsiz iade' },
                { icon: '📞', title: '7/24 Destek', desc: 'Müşteri destek ekibimiz her zaman yanınızda' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kategoriler */}

        <Categories categories={categories} />

        {/* Öne Çıkan Ürünler */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl text-amber-300 font-bold">Öne Çıkan Ürünler</h2>
              <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
                Tüm Ürünler <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                  <div className="relative">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-56" />
                    {product.discountPrice && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                        %{Math.round((1 - product.discountPrice / product.price) * 100)} İNDİRİM
                      </div>
                    )}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 mx-1">
                        ❤️
                      </button>
                      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 mx-1">
                        🔍
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-600 transition">{product.name}</h3>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xl ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                      <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.discountPrice ? (
                          <>
                            <span className="text-xl font-bold text-indigo-600">{product.discountPrice.toFixed(2)} TL</span>
                            <span className="line-through text-gray-500 ml-2">{product.price.toFixed(2)} TL</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-indigo-600">{product.price.toFixed(2)} TL</span>
                        )}
                      </div>
                      <button className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 py-1 px-3 rounded-md text-sm font-medium transition">
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kampanya Bölümü */}
        <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Yaz İndirimleri Başladı!
                </h2>
                <p className="text-xl mb-8 max-w-xl">
                  Tüm ürünlerde geçerli %30&lsquo;a varan indirimlerle yazı karşılayın.
                  Kampanya sınırlı süreyle geçerlidir.
                </p>
                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <span className="text-3xl font-bold">05</span>
                      <span className="block text-sm">Gün</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <span className="text-3xl font-bold">12</span>
                      <span className="block text-sm">Saat</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <span className="text-3xl font-bold">45</span>
                      <span className="block text-sm">Dakika</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <span className="text-3xl font-bold">18</span>
                      <span className="block text-sm">Saniye</span>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition">
                  Hemen Alışveriş Yap
                </button>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-xl shadow-xl p-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Müşteri Yorumları */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">Müşterilerimiz Ne Diyor?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md relative">
                  <div className="absolute top-0 left-8 -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full">
                    <span className="text-2xl">❝</span>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Haber Bülteni */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">Kampanyalardan Haberdar Olun</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Özel indirimler, yeni ürünler ve kampanyalardan haberdar olmak için bültenimize abone olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Abone Ol
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;