import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL as string,
  token: process.env.UPSTASH_REDIS_TOKEN as string,
});

export async function findUrlByShort(short: string): Promise<string | null> {
  return redis.get(short);
}

export async function saveUrl(url: string) {
  const exisitingShort = await redis.hget<string>('urls', url);
  if (exisitingShort) {
    return exisitingShort;
  }
  let short = nanoid(10);
  while (true) {
    const exists = await redis.exists(short);
    if (!exists) {
      break;
    }
    short = nanoid(10);
  }
  await redis.hset('urls', { [url]: short });
  await redis.set(short, url);
  return short;
}
