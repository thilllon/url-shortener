'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  url: z.string().url().min(7, {
    message: 'URL must be at least 7 characters.',
  }),
});

export function UrlShortenerForm() {
  const [shortUrl, setShortUrl] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: '',
    },
  });

  function onSubmit({ url }: z.infer<typeof FormSchema>) {
    const delimeter = '/s/';
    if (!url || !['https://', 'http://'].some((scheme) => url.startsWith(scheme))) {
      return;
    }
    fetch('/api/short', { method: 'POST', body: JSON.stringify({ url }) })
      .then((response) => response.text())
      .then((short) => {
        setShortUrl(`${window.location.origin}${delimeter}${short}`);
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        setShortUrl('');
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[40rem] w-full mx-16 '>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{'URL shortener'}</FormLabel>
                <FormControl>
                  <Input placeholder='Enter URL to shorten' {...field} />
                </FormControl>
                <Link href={shortUrl}>
                  <FormDescription>{shortUrl}</FormDescription>
                </Link>
                <FormDescription>
                  <Link href={shortUrl}>{shortUrl}</Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            {'Submit'}
          </Button>
        </form>
      </Form>
    </>
  );
}
