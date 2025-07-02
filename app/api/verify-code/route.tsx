// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/db';
// import { ObjectId } from 'mongodb';

// export async function POST(req: Request) {
//     const { email, code, username, password } = await req.json();

//     if (!email || !code) {
//         return NextResponse.json({ error: 'Kod veya e-posta eksik.' }, { status: 400 });
//     }

//     try {
//         const client = await connectToDB();
//         const db = client.db();

//         const pendingUser = await db.collection('pendingUsers').findOne({ email });

//         console.log('🔍 Kullanıcıdan gelen kod:', code);
//         console.log('📄 Veritabanındaki kayıt:', pendingUser);
//         if (pendingUser) {
//             console.log('📦 pendingUser.code:', pendingUser.code);
//         }

//         if (!pendingUser) {
//             return NextResponse.json({ error: 'Bu e-posta için bekleyen kayıt bulunamadı.' }, { status: 404 });
//         }

//         // 🔁 Kod karşılaştırmasını güvenli hale getir
//         if (String(pendingUser.code) !== String(code)) {
//             return NextResponse.json({ error: 'Doğrulama kodu hatalı.' }, { status: 401 });
//         }

//         // Kod doğru → kullanıcıyı oluştur
//         await db.collection('users').insertOne({
//             username: pendingUser.username,
//             email: pendingUser.email,
//             password: pendingUser.password,
//             createdAt: new Date()
//         });

//         // Pending'den sil
//         await db.collection('pendingUsers').deleteOne({ _id: new ObjectId(pendingUser._id) });

//         return NextResponse.json({ success: true });
//     } catch (err) {
//         console.error('❌ Kod doğrulama hatası:', err);
//         return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
    const { email, code } = await req.json();

    if (!email || !code) {
        return NextResponse.json({ error: 'Kod veya e-posta eksik.' }, { status: 400 });
    }

    try {
        const client = await connectToDB();
        const db = client.db();

        const pendingUser = await db.collection('pendingUsers').findOne({ email });

        if (!pendingUser) {
            return NextResponse.json({ error: 'Bekleyen kayıt bulunamadı.' }, { status: 404 });
        }

        const codeFromDb = typeof pendingUser.code === 'string'
            ? pendingUser.code.trim()
            : String(pendingUser.code).trim();

        const codeFromUser = typeof code === 'string'
            ? code.trim()
            : String(code).trim();

        console.log('🔍 Kullanıcıdan gelen kod:', codeFromUser);
        console.log('🗄️ Veritabanındaki kod:', codeFromDb);

        if (codeFromDb !== codeFromUser) {
            return NextResponse.json({ error: 'Doğrulama kodu hatalı.' }, { status: 401 });
        }


        //burada sorun olabilir
        await db.collection('users').insertOne({
            username: pendingUser.username,
            email: pendingUser.email,
            password: pendingUser.password,
            cart: [],
            favorites: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        });


        await db.collection('pendingUsers').deleteOne({ _id: new ObjectId(pendingUser._id) });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('❌ Kod doğrulama hatası:', err);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

