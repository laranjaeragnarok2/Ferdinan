import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    return NextResponse.json({ posts: [] }, { status: 200 });
}

export async function POST(request: NextRequest) {
    return NextResponse.json({ message: 'Disabled' }, { status: 503 });
}
