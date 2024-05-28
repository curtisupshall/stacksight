'use server'

import type { PropsWithChildren } from 'react'
import { Container, Stack, Tab, Tabs } from '@mui/material'
import Header from '@/components/ui/header/Header'
import BaseLayout from '@/components/ui/layout/BaseLayout'
import AppTabs from '@/components/ui/header/AppTabs'

export default async (props: PropsWithChildren) => {
	return (
		<Stack component='main' id='root' minHeight='100vh'>
			<Header maxWidth='xl' disableGutters sx={{ px: 8 }} />
			{props.children}
		</Stack>
	)
}
