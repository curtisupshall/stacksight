'use client'

import useAppTabs, { ITab } from "@/hooks/useAppTabs"
import { Container, Tab, Tabs } from "@mui/material"
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

interface IAppTabsProps {
    tabs: ITab[]
}

export default function AppTabs(props: IAppTabsProps) {
    const { tabs } = props;

    const params = useParams();

    console.log('PARAMS:', params)
    const pathname = usePathname();
    const value = useAppTabs(tabs);

    return (
        <Container maxWidth='xl' disableGutters sx={{ px: 8, mt: -2 }}>
            <Tabs value={value}>
                {tabs.map((tab) => {
                    const href = `${pathname}/${tab.href}`
                    return (
                        <Tab
                            key={tab.href}
                            label={tab.label}
                            component={Link}
                            href={href}
                        />
                    )
                })}
            </Tabs>
        </Container>
    )
}
