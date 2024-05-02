import type { PropsWithChildren } from 'react'
import '../styles/main.scss'
import { ThemeProvider } from '@mui/material'
import appTheme from '../theme/appTheme'

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
					{props.children}
				</ThemeProvider>
			</body>
		</html>
	)
}

