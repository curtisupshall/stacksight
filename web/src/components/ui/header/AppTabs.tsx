'use client'

import useAppTabs, { ITab } from "@/hooks/useAppTabs"
import { Container, Tab, Tabs } from "@mui/material"

export default function AppTabs() {
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
        },
        {
            href: `/`,
            label: 'Details',
            matcherKey: 'PROJECT_DETAILS'
        }
    ]
    const value = useAppTabs(tabs);

    return (
        <Container maxWidth='xl' disableGutters sx={{ px: 8, mt: -2 }}>
            <Tabs value={value}>
                {tabs.map((tab) => {
                    return (
                        <Tab key={tab.href} label={tab.label} />
                    )
                })}
            </Tabs>
        </Container>
    )
}
