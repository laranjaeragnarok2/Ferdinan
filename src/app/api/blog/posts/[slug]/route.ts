import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    return NextResponse.json({ post: null }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
    return NextResponse.json({ message: 'Disabled' }, { status: 503 });
}

export async function PUT(request: NextRequest) {
    return NextResponse.json({ message: 'Disabled' }, { status: 503 });
}
