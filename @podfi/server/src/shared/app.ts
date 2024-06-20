import { Hono } from "hono";
import { ServicesRouter } from "../services";
import { APIResponse } from "./lib/response";
import { APIError } from "./lib/error";
import { logger } from "hono/logger";
import { serveStatic } from '@hono/node-server/serve-static'

export const app = new Hono()
  .use(logger())
  .get('/assets/*', serveStatic({ root: './public' }))
  .get('/images/*', serveStatic({ root: './public' }))
  .get('*', serveStatic({ path: './public/index.html' }))
  .notFound((c) => {
    return c.json(
      APIResponse.err('Route not found', 404),
      404
    )
  })
  .onError((err, c) => {
    console.error(`${err}`)

    if (err instanceof APIError)
      return c.json(
        err.toResponse(),
        err.code
      )

    return c.json(
      APIResponse.err(err.message),
      500
    )
  })
  .route('/api', ServicesRouter)

export type App = typeof app
