'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
    const pathname = usePathname()
    const hideNavbar = pathname === '/login' || pathname === '/register'

    if (hideNavbar) return null

    return <Navbar />
}


// // components/ConditionalNavbar.tsx
// 'use client'

// import dynamic from 'next/dynamic'

// const Navbar = dynamic(() => import('./Navbar'), { ssr: false })
// import { usePathname } from 'next/navigation'

// export default function ConditionalNavbar() {
//     const pathname = usePathname()
//     if (pathname === '/login' || pathname === '/register') return null

//     return <Navbar />
// }
