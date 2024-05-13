import { saveUrl } from '../../lib';

export async function POST(request: Request) {
  try {
    const { url } = JSON.parse(await request.text());
    if (!url) {
      return new Response('Empty URL', { status: 400 });
    }
    if (['https://', 'http://'].some((scheme) => url.startsWith(scheme))) {
      const short = await saveUrl(url);
      return new Response(short, { status: 201 });
    }
    return new Response('Invalid URL', { status: 400 });
  } catch (error) {
    console.error(error);
    return new Response('/', { status: 500 });
  }
}
