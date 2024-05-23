'use server'

import type { PropsWithChildren } from 'react'
import '../styles/main.scss'
import { Box, ThemeProvider } from '@mui/material'
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
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
				/>
				<title>StackSight</title>
			</head>
			<body>
				<ThemeProvider theme={appTheme}>
					<SessionProvider session={session}>
						<Box component='main' id='root' minHeight='100vh' display='flex' flexDirection='column'>
							<Header maxWidth='xl' disableGutters sx={{ px: 8 }} />
							{props.children}
						</Box>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

