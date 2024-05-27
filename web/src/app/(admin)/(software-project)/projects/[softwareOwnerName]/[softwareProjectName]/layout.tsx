'use server'

import type { PropsWithChildren } from 'react'
import { Container, Stack, Tab, Tabs } from '@mui/material'
import Header from '@/components/ui/header/Header'
import BaseLayout from '@/components/ui/layout/BaseLayout'
import AppTabs from '@/components/ui/header/AppTabs'
import { ITab } from '@/hooks/useAppTabs'

const tabs: ITab[] = [
	{
		href: ``,
		label: 'Details',
		matcherKey: 'PROJECT_DETAILS'
	},
	{
		href: `scans`,
		label: 'Scans',
		matcherKey: 'PROJECT_SCANS'
	}
];

export default async (props: PropsWithChildren) => {
	
	return (
		<>
			<AppTabs tabs={tabs} />
            <BaseLayout>{props.children}</BaseLayout>
		</>
	)
}
