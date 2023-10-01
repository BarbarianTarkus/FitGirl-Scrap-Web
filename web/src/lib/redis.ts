// src/lib/redis.ts

import { createClient } from 'redis'

export function greet(){
    console.log("Hello World");
}

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();