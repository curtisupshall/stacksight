import type { PropsWithChildren } from 'react'
import '../styles/main.scss'
import { Box, Stack, ThemeProvider } from '@mui/material'
import appTheme from '../theme/appTheme'
import Header from '../components/ui/header/Header'

export default async (props: PropsWithChildren) => {
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
					{props.children}
				</ThemeProvider>
			</body>
		</html>
	)
}

