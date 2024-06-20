import { proxy, useSnapshot, subscribe } from 'valtio'
import { z } from 'zod'

const STORAGE_KEY = 'podfi-theme'

type Store = {
  theme: 'light' | 'dark'
  toggle: () => void
}

const init = () => {
  const defaultData = {
    theme: 'light' as const
  }

  const serializedData = window.localStorage.getItem(STORAGE_KEY)
  if (!serializedData)
    return defaultData

  try {
    const deserializedData = z.object({
      theme: z.enum(['light', 'dark'])
    })
      .parse(serializedData)

    return deserializedData
  }
  catch {
    return defaultData
  }
}

const store = proxy<Store>({
  ...init(),
  toggle: () => {
    if (store.theme === 'light')
      store.theme = 'dark'
    else
      store.theme = 'light'
  }
})

export const useTheme = () =>
  useSnapshot(store)

subscribe(store, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: store.theme }))
})
