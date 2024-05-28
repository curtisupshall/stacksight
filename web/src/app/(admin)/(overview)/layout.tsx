'use server'

import type { PropsWithChildren } from 'react'
import BaseLayout from '@/components/ui/layout/BaseLayout'
import AppTabs from '@/components/ui/header/AppTabs'
import { ITab } from '@/hooks/useAppTabs'

const tabs: ITab[] = [
	{
		href: `/projects`,
		label: 'Projects',
		matcherKey: "PROJECTS"
	},
	{
		href: `/dashboard`,
		label: 'Dashboard',
		matcherKey: "DASHBOARD"
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
