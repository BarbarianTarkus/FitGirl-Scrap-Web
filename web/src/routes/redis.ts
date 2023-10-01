import redis, { databaseName } from '../lib/redis'
import type { RequestHandler } from '@sveltejs/kit'

const redirect = {
	status: 303,
	headers: {
		location: '/'
	}
}

export const get: RequestHandler = async () => {
    let games = []

    const data = await redis.hGetAll(databaseName)
    console.log("DATA:",data)
    if (!data) return { body: { games } }

    // normalize data
    games = Object.keys(data)
      .map((key) => ({
        id: key,
        title: data[key]["title"],
        image: data[key]["image"],
        url: data[key]["url"],
        description: data[key]["description"],
        magnet: data[key]["magnet"],
        size: data[key]["size"],
      }))
      // id = timestamp
      .sort((a, b) => parseInt(b.id) - parseInt(a.id))

    return { body: { games } }
}

export const post: RequestHandler = async ({ request }) => {
    const form = await request.formData()
    const title = form.get("title")
    const id = Date.now().toString()

    const game = JSON.stringify({ title, status: false })

    await redis.hSet(databaseName, id, game)
    return redirect
}

export const patch: RequestHandler = async ({ request }) => {
	// form: update todo
	return redirect
}

export const del: RequestHandler = async ({ request }) => {
	// form: delete todo
	return redirect
}
