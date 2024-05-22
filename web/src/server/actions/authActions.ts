'use server'

import { signIn, signOut } from "@/auth"

export async function handleSignIn() {
    return signIn("github")
}

export async function handleSignOut() {
    return signOut();
}
