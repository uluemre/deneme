// 'use client'

// import { usePathname } from 'next/navigation'
// import Footer from './Footer'

// export default function ConditionalFooter() {
//     const pathname = usePathname()
//     const hideNavbar = pathname === '/login' || pathname === '/register'

//     if (hideNavbar) return null

//     return <Footer />
// }

// components/ConditionalFooter.tsx
'use client'

import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('./Footer'), { ssr: false })
import { usePathname } from 'next/navigation'

export default function ConditionalFooter() {
    const pathname = usePathname()
    if (pathname === '/login' || pathname === '/register') return null

    return <Footer />
}
