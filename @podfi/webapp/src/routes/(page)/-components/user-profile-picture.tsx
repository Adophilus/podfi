import { User } from "@/lib/auth"
import { backend } from "@/lib/backend"
import { FunctionComponent } from "react"
import { Skeleton } from '@/components/ui/skeleton'

export const UserProfilePictureImage: FunctionComponent<{ user: User }> = ({ user }) => {
  const { data, status } = backend.hooks.useGetHashData(user.profilePictureHash)

  if (status === 'pending')
    return <Skeleton
      className="size-10 rounded-full"
    />

  if (status === 'error')
    return null

  return (
    <img
      src={data.data}
      alt="user's profile picture"
      className="size-10 rounded-full object-cover object-center"
    />
  )
}
