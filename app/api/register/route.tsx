// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Eksik bilgi gönderildi.' }, { status: 400 });
        }

        // Aynı email veya username ile kayıtlı biri var mı?
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return NextResponse.json({ error: 'Bu kullanıcı zaten kayıtlı.' }, { status: 409 });
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcıyı oluştur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            cart: [],
            favorites: [],
        });

        await newUser.save();

        return NextResponse.json({ message: 'Kayıt başarılı!' }, { status: 201 });

    } catch (error) {
        console.error('Kayıt hatası:', error);
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
    }
}


// // app/api/register/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import User from '@/models/User';
// import bcrypt from 'bcrypt';

// export async function POST(req: NextRequest) {
//     try {
//         await connectDB();
//         const body = await req.json();
//         let { username, email, password } = body;

//         // Trim işlemi
//         username = username.trim();
//         email = email.trim();
//         password = password.trim();

//         // Boşluk kontrolü
//         if (/\s/.test(username)) {
//             return NextResponse.json({ error: 'Kullanıcı adı boşluk içeremez.' }, { status: 400 });
//         }
//         if (/\s/.test(email)) {
//             return NextResponse.json({ error: 'E-posta boşluk içeremez.' }, { status: 400 });
//         }
//         if (/\s/.test(password)) {
//             return NextResponse.json({ error: 'Şifre boşluk içeremez.' }, { status: 400 });
//         }

//         // Şifre güvenlik kontrolü (en az 8 karakter, büyük, küçük, sayı, özel karakter)
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//         if (!passwordRegex.test(password)) {
//             return NextResponse.json({
//                 error: 'Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, sayı ve özel karakter içermelidir.'
//             }, { status: 400 });
//         }

//         if (!username || !email || !password) {
//             return NextResponse.json({ error: 'Eksik bilgi gönderildi.' }, { status: 400 });
//         }

//         const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//         if (existingUser) {
//             return NextResponse.json({ error: 'Bu kullanıcı zaten kayıtlı.' }, { status: 409 });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//             cart: [],
//             favorites: [],
//         });

//         await newUser.save();

//         return NextResponse.json({ message: 'Kayıt başarılı!' }, { status: 201 });

//     } catch (error) {
//         console.error('Kayıt hatası:', error);
//         return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
//     }
// }
