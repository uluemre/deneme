
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import User from '@/models/User';
// import bcrypt from 'bcrypt';

// export async function POST(req: NextRequest) {
//     const { usernameOrEmail, password } = await req.json();

//     if (!usernameOrEmail || !password) {
//         return NextResponse.json({ success: false, message: 'Alanlar boş bırakılamaz' }, { status: 400 });
//     }

//     try {
//         await connectDB();

//         const user = await User.findOne({
//             $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
//         });

//         if (!user) {
//             return NextResponse.json({ success: false, message: 'Kullanıcı adı veya şifre yanlış' }, { status: 401 });
//         }

//         // Eğer passwordHash değilse modeldeki diğer olası alanları dene
//         const passwordHash = user.passwordHash || user.password || user.hashedPassword;
//         if (!passwordHash) {
//             return NextResponse.json({ success: false, message: 'Şifre verisi eksik' }, { status: 500 });
//         }

//         const isMatch = await bcrypt.compare(password, passwordHash);

//         if (!isMatch) {
//             return NextResponse.json({ success: false, message: 'Şifre yanlış' }, { status: 401 });
//         }

//         return NextResponse.json({ success: true, message: 'Giriş başarılı' }, { status: 200 });

//     } catch (error) {
//         console.error('Login hatası:', error);
//         return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
        return NextResponse.json({ success: false, message: 'Alanlar boş bırakılamaz' }, { status: 400 });
    }

    try {
        await connectDB();

        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Kullanıcı adı veya şifre yanlış' }, { status: 401 });
        }

        const passwordHash = user.passwordHash || user.password || user.hashedPassword;
        if (!passwordHash) {
            return NextResponse.json({ success: false, message: 'Şifre verisi eksik' }, { status: 500 });
        }

        const isMatch = await bcrypt.compare(password, passwordHash);

        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Şifre yanlış' }, { status: 401 });
        }

        // JWT secret key'in .env dosyasında tanımlı olmalı
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET tanımlı değil!');
            return NextResponse.json({ success: false, message: 'Sunucu yapılandırma hatası' }, { status: 500 });
        }

        // Token oluştur
        const token = jwt.sign(
            { userId: user._id.toString(), username: user.username },
            secret,
            { expiresIn: '1h' }
        );

        // Token'ı httpOnly cookie olarak set et
        const response = NextResponse.json({
            success: true,
            message: 'Giriş başarılı',
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 saat (saniye)
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login hatası:', error);
        return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
    }
}
