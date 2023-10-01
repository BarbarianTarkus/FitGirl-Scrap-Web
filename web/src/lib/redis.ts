// src/lib/redis.ts

import 'dotenv/config'
import { createClient } from 'redis'


export const databaseName =
  process.env.NODE_ENV === "development"
    ? "redis-with-svelte-kit-dev"
    : "redis-with-svelte-kit"

const client = createClient()

client.on('error', err => console.log('Redis Client Error', err))

const redis = await client.connect()

console.log("DB:",redis)

export default redis