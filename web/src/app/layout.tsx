import type { PropsWithChildren } from 'react'
import '../styles/main.scss'
import { Box, ThemeProvider } from '@mui/material'
import appTheme from '../theme/appTheme'
import Header from '../components/ui/header/Header'

export default (props: PropsWithChildren) => {
	return (
		<html lang='en'>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
				/>
			</head>
			<body>
				<ThemeProvider theme={appTheme}>
					<Box component='main' id='root' minHeight='100vh' display='flex' flexDirection='column'>
						<Header maxWidth='xl' disableGutters sx={{ px: 8 }} />
						{props.children}
					</Box>
				</ThemeProvider>
			</body>
		</html>
	)
}

