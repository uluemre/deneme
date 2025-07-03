'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function InputField() {
    const router = useRouter();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [fade, setFade] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShowError(false);

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameOrEmail, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            // router.push('/');
            window.location.href = '/'
        } else {
            setError(data.message || 'Hatalı giriş');
            setFade(true);
            setShowError(true);

            // 2.5 saniyede opacity düşsün
            setTimeout(() => setFade(false), 1400);
            // 3 saniyede tamamen kaldırılsın
            setTimeout(() => setShowError(false), 2000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='login'>
            <div className="input-field">
                <h1>Welcome Login Panel</h1>
                <img src="/images/Name.png" width={120} height={120} alt="logo" />

                <input
                    className='input-style'
                    type="text"
                    placeholder="username or e-mail"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    disabled={loading}
                />

                <input
                    className='input-style'
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                {loading ? (
                    <button className="button-style" disabled>Yükleniyor...</button>
                ) : (
                    <input className='button-style' value="Giriş Yap" type="submit" />
                )}

                {loading && <div className="spinner"></div>}

                {showError && (
                    <div className={`error-box ${fade ? 'fade-in' : 'fade-out'}`}>
                        {error}
                    </div>
                )}

                <p>Hesabınız yok mu? <a href='/register' className='register-link'>Kayıt Ol</a></p>
            </div>
        </form>
    );
}

export default InputField;
