import { Redis } from "@upstash/redis";

const client = new Redis({
  url: 'https://relative-duckling-220252.upstash.io',
  token: 'gQAAAAAAA1xcAAIgcDI0NmQzYWY1NTE5MTg0Y2RmOTYzN2ZkNjU3MDRmMTFhYw',
})

export async function set(key, value, ttlSeconds = 300) {
    return client.set(key, value, { ex: ttlSeconds });
}
export async function get(key) { return client.get(key); }
export async function del(key) { return client.del(key); }
