import { serve } from 'https://deno.land/std/http/server.ts'
import { Hono } from 'https://deno.land/x/hono/mod.ts'
import { Deta } from "https://esm.sh/deta@1.1.0";


const app = new Hono()

// get one from deta.space & set it as an env variable
// only needed locally, when running on deta.space it's already set
const deta = Deta(Deno.env.get("DETA_PROJECT_KEY")!)
const db = deta.Base("greetings")

db.put({ key: "secret-greeting", msg: "Hello Hono + Deno + Space!" })

app.get('/', async (c) => {
    const { msg } = await db.get("secret-greeting")
    return c.text(msg)
})

const port = Number(Deno.env.get("PORT")) || 8080
serve(app.fetch, { port })
