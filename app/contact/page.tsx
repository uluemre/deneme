// pages/iletisim.js
'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simüle edilmiş form gönderme
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Başarı mesajını 5 saniye sonra kaldır
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    };

    return (
        <>
            <Head>
                <title>İletişim - MağazaAdı</title>
                <meta name="description" content="Bizimle iletişime geçin, sorularınızı cevaplayalım" />
            </Head>

            <main className="pt-20">
                {/* Hero Bölümü */}
                <section className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bizimle İletişime Geçin</h1>
                            <p className="text-xl max-w-3xl mx-auto">
                                Sorularınız, önerileriniz veya geri bildirimleriniz için aşağıdaki formu doldurabilir veya iletişim bilgilerimizden bize ulaşabilirsiniz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* İletişim Bilgileri ve Form */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* İletişim Bilgileri */}
                            <div>
                                <h2 className="text-3xl font-bold mb-8">İletişim Bilgilerimiz</h2>

                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                            <FiMapPin className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Adres</h3>
                                            <p className="text-gray-600">
                                                Örnek Mahallesi, Teknoloji Caddesi No: 123<br />
                                                İstanbul, Türkiye
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                            <FiPhone className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                                            <p className="text-gray-600">
                                                +90 (555) 123 45 67<br />
                                                +90 (212) 345 67 89
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                            <FiMail className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">E-posta</h3>
                                            <p className="text-gray-600">
                                                info@magazaadi.com<br />
                                                destek@magazaadi.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                            <FiClock className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Çalışma Saatleri</h3>
                                            <p className="text-gray-600">
                                                Pazartesi - Cumartesi: 09:00 - 18:00<br />
                                                Pazar: Kapalı
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <h3 className="text-xl font-semibold mb-4">Sosyal Medya</h3>
                                    <div className="flex space-x-4">
                                        {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                                            <a
                                                key={platform}
                                                href="#"
                                                className="bg-gray-100 hover:bg-indigo-100 p-3 rounded-full transition"
                                            >
                                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* İletişim Formu */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl text-amber-300 font-bold mb-6">Mesaj Gönderin</h2>

                                {submitSuccess && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                        Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5">
                                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                            Adınız Soyadınız
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className=" text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Adınız ve soyadınız"
                                            required
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                            E-posta Adresiniz
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="ornek@mail.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                                            Konu
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                                            placeholder="Mesaj konusu"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                            Mesajınız
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Mesajınızı buraya yazın..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full flex justify-center items-center py-3 px-6 text-white font-medium rounded-lg transition ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 hover:bg-indigo-700'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Gönderiliyor...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" />
                                                Mesajı Gönder
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Harita Bölümü */}
                        <div className="mt-20">
                            <h2 className="text-3xl font-bold mb-6 text-center">Konumumuz</h2>
                            <div className="rounded-xl overflow-hidden shadow-lg h-96">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385398.589803348!2d28.731991799999998!3d41.0049823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1691422823034!5m2!1str!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Sıkça Sorulan Sorular */}
                        <div className="mt-20">
                            <h2 className="text-3xl font-bold mb-8 text-center">Sıkça Sorulan Sorular</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        question: "Siparişim ne zaman kargoya verilir?",
                                        answer: "Siparişleriniz 1-2 iş günü içinde kargoya verilir. Stok durumuna göre bazen bu süre değişebilir."
                                    },
                                    {
                                        question: "İade işlemi nasıl yapılır?",
                                        answer: "İade etmek istediğiniz ürünü 14 gün içinde kutusu ve faturasıyla birlikte gönderebilirsiniz."
                                    },
                                    {
                                        question: "Kargo ücreti ne kadar?",
                                        answer: "150 TL ve üzeri alışverişlerde kargo ücretsizdir. 150 TL altı alışverişlerde kargo ücreti 19.99 TL'dir."
                                    },
                                    {
                                        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                                        answer: "Kredi kartı, banka havalesi, kapıda ödeme ve dijital cüzdanlar ile ödeme yapabilirsiniz."
                                    }
                                ].map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-3 flex items-center">
                                                <span className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                                    {index + 1}
                                                </span>
                                                {faq.question}
                                            </h3>
                                            <p className="text-gray-600 pl-11">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
};

export default ContactPage;