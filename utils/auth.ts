import jwt from 'jsonwebtoken';

export function getUserIdFromToken(): string | null {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwt.decode(token) as { userId?: string };
        return decoded?.userId || null;
    } catch (err) {
        console.error('Token çözümleme hatası:', err);
        return null;
    }
}
