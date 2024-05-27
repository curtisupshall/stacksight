'use server'

import type { PropsWithChildren } from 'react'
import { Stack } from '@mui/material'
import Header from '@/components/ui/header/Header'

export default async (props: PropsWithChildren) => {
	return (
		<Stack component='main' id='root' minHeight='100vh'>
			<Header maxWidth='xl' disableGutters sx={{ px: 8 }} />
			{props.children}
		</Stack>
	)
}
