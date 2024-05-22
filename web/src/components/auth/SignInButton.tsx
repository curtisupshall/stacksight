import { handleSignIn } from "@/server/actions/authActions"
import { MenuItem } from "@mui/material"
 
export default function SignInButton() {
  return (
    <form action={handleSignIn}>
      <MenuItem component='button' type='submit' sx={{ width: '100%' }}>Sign in with GitHub</MenuItem>
    </form>
  )
}
