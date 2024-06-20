import { Hono } from "hono";
import { StorageRouter } from "./storage"

export const ServicesRouter = new Hono()
  .route('/storage', StorageRouter)
