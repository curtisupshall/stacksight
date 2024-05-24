'use client'

import { Dialog, DialogContent, Grow, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

export default function Search() {
    const [open, setOpen] = useState<boolean>(false);

    const textPlaceholder = `Search projects of technologies`

    return (
        <>
            <a style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
                <Stack
                    direction='row'
                    gap={0.5}
                    sx={{
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                        borderRadius: 16,
                        color: 'rgba(0, 0, 0, 0.65)',
                        py: 1.5,
                        pl: 2,
                        pr: 8
                    }}
                >
                    <SearchIcon color='inherit' />
                    <Typography sx={{ userSelect: 'none' }}>{textPlaceholder}</Typography>
                </Stack>
            </a>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Grow}
            >
                <DialogContent>
                    <TextField
                        label='Search'
                        size='small'
                        placeholder={textPlaceholder}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

