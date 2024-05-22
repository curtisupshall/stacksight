import { auth } from "@/auth"
import { Avatar } from "@mui/material"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <Avatar src={session?.user?.image ?? undefined} sx={{ ml: 1 }} />
  )
}