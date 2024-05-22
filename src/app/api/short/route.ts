import { saveUrl } from '../../lib';

export async function POST(request: Request) {
  const { url } = JSON.parse(await request.text());
  if (!url) {
    throw new Error('Empty URL');
  }
  if (['https://', 'http://'].some((scheme) => url.startsWith(scheme))) {
    const short = await saveUrl(url);
    return new Response(short);
  }
  throw new Error('Invalid URL');
}
