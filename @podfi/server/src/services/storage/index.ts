import { Hono } from "hono";
import { storage } from "@/shared/lib/storage";
import { APIResponse, toJsonResponse } from "@/shared/lib/response";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'

export const StorageRouter = new Hono()
  .post("/",
    zValidator('json', z.object({
      data: z.string()
    })),
    async (c) => {
      const { data } = c.req.valid('json')

      const uri = await storage.upload({ data });

      return toJsonResponse(c, APIResponse.ok(uri))
    })
  .post('/retrieve',
    zValidator('json', z.object({
      hash: z.string()
    })),
    (c) => {
    const { hash } = c.req.valid('json')
      const url = storage.resolveScheme(hash);
      return toJsonResponse(c, APIResponse.ok(url))
    })
