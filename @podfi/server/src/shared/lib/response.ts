import { Context, Env, Input } from "hono";
import { StatusCodes } from "http-status-codes";

type ErrorResponse<E, Code extends StatusCodes> = {
  variant: "error"
  code: Code
  error: E
}

type OkResponse<T, Code extends StatusCodes> = {
  variant: "ok"
  code: Code
  data: T
}

export const toJsonResponse = <
  C1 extends Env,
  C2 extends string,
  C3 extends Input,
  T,
  TC extends StatusCodes,
  E,
  EC extends StatusCodes
>(c: Context<C1, C2, C3>, res: APIResponse<T, TC, E, EC>) =>
  c.json(
    res,
    { status: res.code }
  )

export const APIResponse = {
  err: <E, Code extends StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR>(error: E, code?: Code): ErrorResponse<E, Code> => {
    return {
      variant: "error",
      code: code === undefined ? StatusCodes.INTERNAL_SERVER_ERROR as Code : code,
      error,
    }
  },
  ok: <T, Code extends StatusCodes = StatusCodes.OK>(data: T, code?: Code): OkResponse<T, Code> => {
    return {
      variant: "ok",
      code: code === undefined ? StatusCodes.OK as Code : code,
      data,
    }
  },
}

export type APIResponse<T, TC extends StatusCodes, E, EC extends StatusCodes> = OkResponse<T, TC> | ErrorResponse<E, EC>

