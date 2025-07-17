import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Giriş yapılmamış.' }, { status: 401 });
    }

    const { productId } = await req.json();
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    // Favori var mı kontrol et
    const existing = await prisma.favorite.findFirst({
        where: {
            userId: user.id,
            productId,
        },
    });

    if (existing) {
        // Varsa kaldır (toggle)
        await prisma.favorite.delete({
            where: { id: existing.id },
        });
        return NextResponse.json({ message: 'Favoriden çıkarıldı.' });
    } else {
        // Yoksa ekle
        await prisma.favorite.create({
            data: {
                userId: user.id,
                productId,
            },
        });
        return NextResponse.json({ message: 'Favorilere eklendi.' });
    }
}
