import { PropsWithChildren } from "react"
import { Breadcrumbs, Container, Link, Paper, Tab, Tabs, Typography } from "@mui/material";
import BaseLayout from "@/components/ui/layout/BaseLayout";

export default (props: PropsWithChildren) => {
    return (
        <>
            <Container maxWidth='xl' disableGutters sx={{ px: 8, mt: -2 }}>
                <Tabs value={0}>
                    <Tab label='Dashboard' />
                    <Tab label='Projects' />
                </Tabs>
            </Container>
            <BaseLayout>{props.children}</BaseLayout>
        </>
    );
}
