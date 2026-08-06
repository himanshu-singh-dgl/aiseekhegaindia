import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const relativePath = segments.join('/');

  if (!relativePath || relativePath.includes('..')) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(CONTENT_DIR, relativePath);
  const ext = path.extname(filePath).toLowerCase();

  if (!MIME[ext]) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(data, {
      headers: {
        'Content-Type': MIME[ext],
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
