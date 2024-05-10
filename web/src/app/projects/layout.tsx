import { PropsWithChildren } from "react"
import { Container } from "@mui/material";

export default (props: PropsWithChildren) => {
    return (
        <Container maxWidth='xl' disableGutters sx={{ px: 8 }}>
            {props.children}
        </Container>
    );
}
