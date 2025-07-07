// app/api/verify-code/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { username, email, password, code } = body

        if (!username || !email || !password || !code) {
            return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 })
        }

        // Kod ve email ile pendingUser'ı kontrol et
        const pendingUser = await prisma.pendingUser.findUnique({
            where: { email }
        })

        if (!pendingUser || pendingUser.code !== code) {
            return NextResponse.json({ error: 'Kod yanlış veya süresi dolmuş.' }, { status: 400 })
        }

        // Daha önce kayıtlı mı?
        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        })
        if (existing) {
            return NextResponse.json({ error: 'Bu kullanıcı zaten var' }, { status: 409 })
        }

        // Artık gerçek kullanıcıyı oluşturabiliriz
        await prisma.user.create({
            data: {
                username,
                email,
                password: pendingUser.password, // Zaten hashlenmişti
                isVerified: true,
            },
        })

        // Kayıt başarılıysa pending veriyi silebiliriz (isteğe bağlı)
        await prisma.pendingUser.delete({ where: { email } })

        return NextResponse.json({ message: 'Kayıt tamamlandı!' }, { status: 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
