import { useMutation, useQuery } from "@tanstack/react-query";
import { App } from "@podfi/server/index"
import { hc } from 'hono/client'
import base64 from 'base64-encode-file'

const backend = hc<App>('/')

export const useUploadFile = () =>
  useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const res = await backend.api.storage.$post({
        json: {
          data: await base64(file)
        }
      })

      const json = await res.json()

      if (json.variant === 'error')
        throw new Error(json.error)

      return json.data as string
    }
  })

export const useGetHashData = (hash: string) =>
  useQuery({
    queryKey: ['hash', hash],
    queryFn: async () => {
      const res = await backend.api.storage.retrieve.$post({
        json: {
          hash
        }
      })

      const json = await res.json()

      if (json.variant === 'error')
        throw new Error(json.error)

      const res2 = await fetch(json.data)
      return res2.json() as { data: string }
    }
  }) 
