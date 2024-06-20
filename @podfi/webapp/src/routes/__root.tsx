import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/ui/toaster'
import { AppProvider } from './-components/provider';


export const Route = createRootRoute({
  component: () => (
    <AppProvider>
      <Outlet />
      <Extras />
    </AppProvider>
  ),
})

const Extras = () =>
  <>
    <Toaster />
    <Devtools />
  </>

const Devtools = () => {
  if (import.meta.env.MODE === 'production')
    return null

  return (
    <>
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

