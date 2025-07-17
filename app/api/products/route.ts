import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { created_at: 'desc' }, // varsa sıralama
        });

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('GERÇEK HATA:', error);  // 👈 BU SATIR ÇOK ÖNEMLİ
        return NextResponse.json({ error: 'Ürünler getirilirken hata oluştu.' }, { status: 500 });
    }
}
