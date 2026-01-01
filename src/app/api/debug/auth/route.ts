import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { cookies as getCookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const cookies = await getCookies();
        const cookieList = cookies.getAll().map(c => ({
            name: c.name,
            value: c.name.includes('token') || c.name.includes('session') ? '[PROTECTED]' : c.value
        }));

        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        });

        const debugInfo = {
            timestamp: new Date().toISOString(),
            url: request.url,
            nextAuthUrl: process.env.NEXTAUTH_URL,
            hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
            cookies: cookieList,
            tokenFound: !!token,
            protocol: request.nextUrl.protocol,
            host: request.headers.get('host'),
        };

        console.log('DEBUG AUTH:', JSON.stringify(debugInfo, null, 2));

        return NextResponse.json(debugInfo);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
