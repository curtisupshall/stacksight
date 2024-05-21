import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

// import PostgresAdapter from "@auth/pg-adapter"
// import { Pool } from "pg"
 
export default {
    providers: [GitHub],
    session: {
        // strategy: 'database'
        strategy: 'jwt'
    }
} satisfies NextAuthConfig
