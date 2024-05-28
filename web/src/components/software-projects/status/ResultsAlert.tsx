'use client'

import { Alert, AlertTitle, Box, Collapse, Typography } from "@mui/material";
import { useState } from "react";

export default function ResultsAlert() {
    const [hidden, setHidden] = useState<boolean>(false);

    return (
        <Collapse in={!hidden}>
            <Box pb={2}>
                <Alert severity="warning" onClose={() => setHidden(true)}>
                    <AlertTitle>Results are not current</AlertTitle>
                    <Typography>The results of this project will be updated when the next successful scan is completed.</Typography>
                </Alert>
            </Box>
        </Collapse>
    )
}
