'use server'

import type { PropsWithChildren } from 'react'
import '../styles/main.scss'
import { Box, Stack, ThemeProvider } from '@mui/material'
import appTheme from '../theme/appTheme'
import Header from '../components/ui/header/Header'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

export default async (props: PropsWithChildren) => {
	const session = await auth();

	return (
		<html lang='en'>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
				/>
				<title>StackSight</title>
			</head>
			<body>
				<ThemeProvider theme={appTheme}>
					<SessionProvider session={session}>
						{props.children}
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

