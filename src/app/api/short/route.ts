'use server';

import { saveUrl } from '../../lib';

export async function POST(request: Request) {
  const { url } = JSON.parse(await request.text());
  if (url?.startsWith('http://') || url?.startsWith('https://')) {
    const short = await saveUrl(url);
    return new Response(short, { status: 201 });
  }
  return new Response('Invalid URL', { status: 400 });
}
