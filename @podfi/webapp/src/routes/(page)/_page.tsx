import { Navbar } from "./-components/navbar"
import { Footer } from "./-components/footer"
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(page)/_page')({
  component: PageLayout
})

function PageLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
