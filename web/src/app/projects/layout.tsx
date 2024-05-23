import { PropsWithChildren } from "react"
import { Breadcrumbs, Container, Link, Paper, Tabs, Typography } from "@mui/material";

export default (props: PropsWithChildren) => {
    return (
        <>
            <Container maxWidth='xl' disableGutters sx={{ px: 8 }}>
                
            </Container>
            <Paper square variant="outlined" sx={{ flex: 1, pt: 4, borderLeft: 0, borderRight: 0 }}>
                <Container maxWidth='xl' disableGutters sx={{ px: 8 }}>
                    {props.children}
                </Container>
            </Paper>
        </>
    );
}
