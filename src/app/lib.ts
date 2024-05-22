'use server';

import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL as string,
  token: process.env.UPSTASH_REDIS_TOKEN as string,
});

function createShort(length: number): string {
  return nanoid(length);
}

export async function findOriginalUrl(short: string): Promise<string | null> {
  return redis.get(short);
}

export async function saveUrl(url: string) {
  // TODO: find url in redis and return short if exists
  const short = createShort(10);
  await redis.set(short, url);
  return short;
}
