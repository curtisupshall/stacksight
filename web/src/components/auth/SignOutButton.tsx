// import { handleSignOut } from "@/server/actions/authActions"
import { MenuItem } from "@mui/material"
 
export default function SignOutButton() {
  return (
    <form>
      <MenuItem component='button' type='submit' sx={{ width: '100%' }}>Sign out</MenuItem>
    </form>
  )
}
