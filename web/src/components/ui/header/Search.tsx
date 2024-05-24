'use client'

import { Dialog, DialogContent, Grow, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";

export default function Search() {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');

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
                        py: 0.75,
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
                fullWidth
                maxWidth={false}
                PaperProps={{
                    sx: {
                        position: 'absolute',
                        top: 0,
                        mt: 0.5
                    }
                }}
            >
                <DialogContent sx={{}}>
                    <TextField
                        name='stacksight__search'
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        autoFocus
                        size='small'
                        placeholder={textPlaceholder}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: query.length ? (
                                <InputAdornment position='end'>
                                    <IconButton onClick={() => setQuery('')}>
                                        <Close fontSize="small"/>
                                    </IconButton>
                                </InputAdornment>
                            ) : undefined
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

