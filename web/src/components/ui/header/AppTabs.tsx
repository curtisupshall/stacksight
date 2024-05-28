'use client'

import useAppTabs, { ITab } from "@/hooks/useAppTabs"
import { Container, Tab, Tabs } from "@mui/material"
import Link from "next/link";
import { useParams } from "next/navigation";

interface IAppTabsProps {
    tabs: ITab[]
}

export default function AppTabs(props: IAppTabsProps) {
    const { tabs } = props;

    const params = useParams();

    const value = useAppTabs(tabs);

    return (
        <Container maxWidth='xl' disableGutters sx={{ px: 8, mt: -2 }}>
            <Tabs value={value}>
                {tabs.map((tab) => {
                    const href = tab.href
                        .split('/')
                        .map((part: string) => {
                            if (/\[.*\]$/.test(part)) {
                                const paramName = part.slice(1, -1)
                                return params?.[paramName] ?? ''
                            } else {
                                return part
                            }
                        })
                        .join('/');

                    return (
                        <Tab
                            key={href}
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
