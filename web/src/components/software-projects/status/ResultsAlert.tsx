'use client'

import { Alert, AlertTitle, Box, Collapse, Typography } from "@mui/material";
import { useState } from "react";

export default function ResultsAlert(props: { visible: boolean }) {
    const [show, setShow] = useState<boolean>(props.visible);

    return (
        <Collapse in={show}>
            <Box pb={2}>
                <Alert severity="warning" onClose={() => setShow(false)}>
                    <AlertTitle>Results are not current</AlertTitle>
                    <Typography>The results of this project will be updated when the next successful scan is completed.</Typography>
                </Alert>
            </Box>
        </Collapse>
    )
}
