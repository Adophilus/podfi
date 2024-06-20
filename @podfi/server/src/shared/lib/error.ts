import { StatusCodes } from "http-status-codes"
import { APIResponse, toJsonResponse } from "./response"

type Options<C> = {
  cause?: Error
  code: C
}

export class APIError<C extends StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR> extends Error {
  public declare code: C
  public declare cause?: Error

  constructor(error: string);
  constructor(error: string, options: Options<C>);

  constructor(
    error: string,
    options?: Options<C>
  ) {
    super(error)

    this.name = "APIError"
    this.code = options?.code === undefined
      ? StatusCodes.INTERNAL_SERVER_ERROR as C
      : options.code
    this.cause = options?.cause
  }

  toResponse() {
    return APIResponse.err(this.message, this.code)
  }
}

