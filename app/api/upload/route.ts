import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0); 

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const key = url.searchParams.get('key');

  const secret = process.env.ENCRYPTION_KEY;
  const uploadUrl = process.env.UPLOAD_URL;

  if (!key || !secret || !uploadUrl) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const keyBuffer = crypto.createHash('sha256').update(secret).digest();

    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
    let decrypted = decipher.update(key, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return NextResponse.redirect(uploadUrl);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 403 });
  }
}
