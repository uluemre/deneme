import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectToDB } from '@/lib/db';
import { hash } from 'bcrypt';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
    const { email, username, password } = await req.json();

    // Trim ile boşluk temizliği ve normalize
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedUsername = username?.trim().toLowerCase();
    const trimmedPassword = password?.trim();

    if (!trimmedEmail || !trimmedUsername || !trimmedPassword) {
        return NextResponse.json({ error: 'Eksik veri gönderildi.' }, { status: 400 });
    }

    try {
        const client = await connectToDB();
        const db = client.db();

        // Aynı kullanıcı adı veya e-posta zaten kayıtlı mı?
        const existingUser = await db.collection('users').findOne({
            $or: [{ email: trimmedEmail }, { username: trimmedUsername }]
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Bu e-posta veya kullanıcı adı zaten kayıtlı.' }, { status: 409 });
        }

        // 6 haneli doğrulama kodu oluştur
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('📨 Gönderilecek doğrulama kodu:', code);

        const hashedPassword = await hash(trimmedPassword, 10);

        // Pending kayıt varsa güncelle, yoksa ekle
        const pendingUser = await db.collection('pendingUsers').findOne({ email: trimmedEmail });

        if (pendingUser) {
            await db.collection('pendingUsers').updateOne(
                { email: trimmedEmail },
                {
                    $set: {
                        username: trimmedUsername,
                        password: hashedPassword,
                        code,
                        createdAt: new Date(),
                    },
                }
            );
        } else {
            await db.collection('pendingUsers').insertOne({
                _id: new ObjectId(),
                email: trimmedEmail,
                username: trimmedUsername,
                password: hashedPassword,
                code,
                createdAt: new Date(),
            });
        }

        // E-postayı gönder
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"E-Ticaret Sitesi" <${process.env.EMAIL_USER}>`,
            to: trimmedEmail,
            subject: 'E-Posta Doğrulama Kodu',
            html: `
    <div style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #333;">🛒 E-Ticaret Sitesi</h2>
      <p style="font-size: 16px; color: #333;">Merhaba <strong>${trimmedUsername}</strong>,</p>
      <p style="font-size: 15px; color: #444;">Kayıt işlemini tamamlamak için aşağıdaki doğrulama kodunu kullan:</p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; letter-spacing: 4px; font-weight: bold; color: #2b7a78; background: #e0f7fa; padding: 10px 20px; border-radius: 6px; display: inline-block;">
          ${code}
        </span>
      </div>

      <p style="font-size: 14px; color: #666;">
        Bu kod 10 dakika boyunca geçerlidir. Kodu kimseyle paylaşmayınız.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />

      <p style="font-size: 13px; color: #aaa; text-align: center;">
        Bu e-posta E-Ticaret Sitesi tarafından otomatik olarak gönderilmiştir. Yanıtlamayınız.
      </p>
    </div>
  `,
        });


        return NextResponse.json({ success: true });

    } catch (err) {
        console.error('📨 Doğrulama gönderme hatası:', err);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
