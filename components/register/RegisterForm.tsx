'use client';

import React, { useState } from 'react';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [visible, setVisible] = useState(false);

    const [step, setStep] = useState<'register' | 'verify'>('register');
    const [verificationCode, setVerificationCode] = useState('');
    const [realEmail, setRealEmail] = useState('');
    const [realUsername, setRealUsername] = useState('');
    const [realPassword, setRealPassword] = useState('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;

    // ✅ Kayıt işlemi
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Boşluk kontrolü
        if (/\s/.test(trimmedUsername)) {
            showMessage('Kullanıcı adı boşluk içeremez.', true);
            return;
        }
        if (/\s/.test(trimmedEmail)) {
            showMessage('E-posta boşluk içeremez.', true);
            return;
        }
        if (/\s/.test(trimmedPassword)) {
            showMessage('Şifre boşluk içeremez.', true);
            return;
        }

        // Şifre karmaşıklık kontrolü
        if (!passwordRegex.test(trimmedPassword)) {
            showMessage('Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, sayı ve özel karakter içermelidir.', true);
            return;
        }

        // E-posta format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            showMessage('Geçerli bir e-posta giriniz.', true);
            return;
        }

        const res = await fetch('/api/send-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: trimmedUsername,
                email: trimmedEmail,
                password: trimmedPassword,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            showMessage('Doğrulama kodu e-postanıza gönderildi.', false);
            setRealUsername(trimmedUsername);
            setRealEmail(trimmedEmail);
            setRealPassword(trimmedPassword);
            setStep('verify');
        } else {
            showMessage(data.error || 'Bir hata oluştu.', true);
        }
    }

    // ✅ Doğrulama işlemi
    async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch('/api/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: realEmail,
                code: verificationCode.trim(),
                username: realUsername,
                password: realPassword,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            showMessage('Kayıt tamamlandı! Giriş yapabilirsiniz.', false);
            setStep('register');
            setUsername('');
            setEmail('');
            setPassword('');
            setVerificationCode('');

        } else {
            showMessage(data.error || 'Kod yanlış veya süresi dolmuş.', true);
        }
    }

    const showMessage = (text: string, isErr: boolean) => {
        setMessage(text);
        setIsError(isErr);
        setVisible(true);
        setTimeout(() => setVisible(false), 1300);
        setTimeout(() => setMessage(''), 2800);
    };

    return (
        <>
            {message && (
                <p
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'fit-content',
                        color: isError ? 'red' : 'green',
                        border: `1px solid ${isError ? 'red' : 'green'}`,
                        padding: 10,
                        borderRadius: 4,
                        backgroundColor: isError ? '#ffe6e6' : '#e6ffee',
                        zIndex: 1000,
                        opacity: visible ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                    }}
                >
                    {message}
                </p>
            )}

            {step === 'register' && (
                <form className='register-container' onSubmit={handleSubmit}>
                    <h1 className='form-title'>Welcome Register Page</h1>
                    <img src='/images/logo.png' width={150} height={150} className='logo' alt="logo" />

                    <input
                        className="input-style"
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="input-style"
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="input-style"
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input className='button-style' type="submit" value="Kayıt Ol" />
                    <p>
                        Zaten Hesabım Var{' '}
                        <a className="login-link" href='/login'>Giriş Yap</a>
                    </p>
                </form>
            )}

            {step === 'verify' && (
                <form className='register-container' onSubmit={handleVerify}>
                    <h1 className='form-title'>Doğrulama Kodu</h1>
                    <input
                        className="input-style"
                        type="text"
                        placeholder='6 Haneli Kod'
                        value={verificationCode}
                        onChange={e => setVerificationCode(e.target.value)}
                        required
                        maxLength={6}
                        pattern="\d{6}"
                        title="Lütfen 6 haneli sayısal kod girin."
                    />
                    <input className='button-style' type="submit" value="Doğrula ve Kaydol" />
                </form>
            )}
        </>
    );
}

export default RegisterForm;
