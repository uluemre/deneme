// app/api/favorites/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
        return NextResponse.json({ error: 'Eksik veri gönderildi.' }, { status: 400 });
    }

    // Daha önce favorilenmiş mi kontrol et
    const existing = await prisma.favorite.findFirst({
        where: {
            userId: userId,
            productId: productId,
        },
    });

    if (existing) {
        // Favoriden çıkar
        await prisma.favorite.delete({
            where: {
                id: existing.id,
            },
        });

        return NextResponse.json({ success: true, favorited: false });
    } else {
        // Favoriye ekle
        await prisma.favorite.create({
            data: {
                userId,
                productId,
            },
        });

        return NextResponse.json({ success: true, favorited: true });
    }
}
