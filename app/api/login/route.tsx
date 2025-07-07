import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { usernameOrEmail, password } = await req.json();

        if (!usernameOrEmail || !password) {
            return NextResponse.json({ success: false, message: 'Eksik bilgi.' }, { status: 400 });
        }

        // Kullanıcıyı email veya username ile bul
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: usernameOrEmail.toLowerCase() },
                    { username: usernameOrEmail.toLowerCase() },
                ],
            },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Kullanıcı bulunamadı.' }, { status: 404 });
        }

        // Şifre doğrula
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: 'Şifre yanlış.' }, { status: 401 });
        }

        // İstersen JWT üret (örnek)
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        // Dönüş: token ve kullanıcı bilgisi (şifre hariç)
        return NextResponse.json({
            success: true,
            message: 'Giriş başarılı!',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
            },
        });
    } catch (error) {
        console.error('Login hatası:', error);
        return NextResponse.json({ success: false, message: 'Sunucu hatası.' }, { status: 500 });
    }
}
