import { z } from 'zod'

const EnvSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535),
  THIRDWEB_API_KEY: z.string(),
})

const env = EnvSchema
  .parse(process.env)

export const config = {
  app: {
    port: env.PORT
  },
  thirdweb: {
    apiKey: env.THIRDWEB_API_KEY
  }
}
