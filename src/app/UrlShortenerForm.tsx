'use client';

import Link from 'next/link';
import { useState } from 'react';

export function UrlShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const delimeter = '/s/';
          if (!url || !['https://', 'http://'].some((scheme) => url.startsWith(scheme))) {
            return;
          }
          fetch('/api/short', { method: 'POST', body: JSON.stringify({ url }) })
            .then((response) => response.text())
            .then((short) => {
              setShortUrl(`${window.location.origin}${delimeter}${short}`);
              setUrl('');
            })
            .catch((error) => {
              console.error(error);
              setShortUrl(error?.message);
            });
        }}
        className='flex justify-center items-center gap-2 h-30'>
        <input value={url} onChange={(ev) => setUrl(ev.target.value)} className='h-10 rounded-lg px-4 w-96' />
        <button type='submit' className='h-10   border-black border-2 px-2 rounded-lg'>
          {'create'}
        </button>
      </form>
      <div>
        <Link href={shortUrl}>{shortUrl}</Link>
      </div>
    </>
  );
}
