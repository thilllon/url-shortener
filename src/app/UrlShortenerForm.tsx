'use client';

import { useState } from 'react';
import Link from 'next/link';

export function UrlShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (url?.startsWith('http://') || url?.startsWith('https://')) {
            const short = await fetch('/api/short', {
              method: 'POST',
              body: JSON.stringify({ url }),
            }).then((res) => res.text());
            setShortUrl(`${window.location.origin}/s/${short}`);
          }
          setUrl('');
        }}
        className='flex justify-center items-center gap-2 h-30'>
        <input
          value={url}
          onChange={(ev) => {
            setUrl(ev.target.value);
          }}
          className='h-10 rounded-lg px-4 w-96'
        />
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
