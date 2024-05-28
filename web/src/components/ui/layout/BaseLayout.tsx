import { Container, Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export default function BaseLayout(props: PropsWithChildren) {
    return (
        <Paper square variant="outlined" sx={{ flex: 1, pt: 4, borderLeft: 0, borderRight: 0 }}>
            <Container maxWidth='xl' disableGutters sx={{ px: 8 }}>
                {props.children}
            </Container>
        </Paper>
    )
}
