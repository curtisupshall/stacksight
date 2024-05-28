import { Container } from "@mui/material";
import { PropsWithChildren } from "react";

export default function BaseContainer(props: PropsWithChildren) {
    return (
        <Container maxWidth='xl' disableGutters sx={{ px: 8 }}>
            {props.children}
        </Container>
    )
}
