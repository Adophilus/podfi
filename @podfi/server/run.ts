import { app, config } from "./src"
import { serve } from "@hono/node-server"

serve({
  port: config.app.port,
  fetch: app.fetch,
}, (info) => {
  console.log(`Server running on ${info.address}:${info.port}`)
})

