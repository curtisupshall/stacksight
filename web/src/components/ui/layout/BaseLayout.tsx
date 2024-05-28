import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";
import BaseContainer from "./BaseContainer";

export default function BaseLayout(props: PropsWithChildren) {
    return (
        <Paper square variant="outlined" sx={{ flex: 1, pt: 3, borderLeft: 0, borderRight: 0 }}>
            <BaseContainer>
                {props.children}
            </BaseContainer>
        </Paper>
    )
}
