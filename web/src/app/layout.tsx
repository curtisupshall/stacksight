import type { PropsWithChildren } from 'react'
import '../styles/main.scss'

export default (props: PropsWithChildren) => {
	return (
		<html lang='en'>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
				/>
			</head>
			<body>
				{props.children}
			</body>
		</html>
	)
}
