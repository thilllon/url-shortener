import Image from 'next/image';
import { UrlShortenerForm } from './UrlShortenerForm';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='flex items-center w-full justify-center'>
        <UrlShortenerForm />
      </div>
    </main>
  );
}
