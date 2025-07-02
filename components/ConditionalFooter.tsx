'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalNavbar() {
    const pathname = usePathname()
    const hideNavbar = pathname === '/login' || pathname === '/register'

    if (hideNavbar) return null

    return <Footer />
}
