'use client'

import { Box, CircularProgress, Dialog, DialogContent, Fade, Grow, IconButton, InputAdornment, ListItemText, MenuItem, MenuList, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { ISearchResponse } from "@/server/services/search-service";
import SearchLaunchButton from "./SearchLaunchButton";
import NextLink from "next/link";

const placeholderText = `Search projects of technologies`

export default function Search() {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<ISearchResponse | null>(null);
    const [error, setError] = useState<any | null>(null);

    const handleOpen = () => {
        setOpen(true);
        setQuery('');
        setError(null);
        setResults(null);
    }

    const resultsSections = useMemo(() => {
        if (!results) {
            return []
        }

        const sections = [];


        if (results.owners.length) {
            sections.push({
                label: 'Owners',
                items: results.owners.map((owner) => {
                    return {
                        key: owner.owner_name,
                        label: owner.owner_name,
                        description: undefined,
                        link: `/projects/${owner.owner_name}`
                    }
                })
            })
        }
        if (results.projects.length) {
            sections.push({
                label: 'Projects',
                items: results.projects.map((project) => {
                    return {
                        key: project.software_project_id,
                        label: project.full_name,
                        description: project.description,
                        link: `/projects/${project.full_name}`
                    }
                })
            })
        }
        if (results.technologies.length) {
            sections.push({
                label: 'Technologies',
                items: results.technologies.map((technology) => {
                    return {
                        key: technology.slug,
                        label: technology.name,
                        description: technology.description,
                        link: `/tags/${technology.slug}`
                    }
                })
            })
        }

        return sections;
    }, [results]);
    
    useEffect(() => {
        setError(null);

        if (!query.length) {
            return;
        }
        setLoading(true);
        axios.get<ISearchResponse>(`/api/search?q=${query}`)
            .then((response) => {
                setResults(response.data)
                setError(null)
            })
            .catch((error: any) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [query]);

    const hasError = Boolean(error);

    return (
        <>
            <a style={{ cursor: 'pointer' }} onClick={handleOpen}>
                <SearchLaunchButton placeholderText={placeholderText} />
            </a>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Fade}
                fullWidth
                maxWidth={false}
                PaperProps={{
                    sx: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        mt: 0.75,
                        mx: 16,
                        width: 'unset'
                    }
                }}
            >
                <DialogContent sx={{ py: 0 }}>
                    <Paper elevation={0} square sx={{ py: 2, position: 'sticky', top: 0, zIndex: 2 }}>
                        <TextField
                            name='stacksight__search'
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            autoFocus
                            size='small'
                            placeholder={placeholderText}
                            fullWidth
                            error={hasError}
                            helperText={hasError ? (
                                <Typography variant='inherit' color='error'>An error occurred.</Typography>
                            ) : undefined}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: query.length ? (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setQuery('')}>
                                            <CancelIcon fontSize="small"/>
                                        </IconButton>
                                    </InputAdornment>
                                ) : undefined
                            }}
                        />
                    </Paper>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {resultsSections.length > 0 ? (
                                <Box sx={{ pb: 2, overflowY: 'auto', overflowX: 'hidden' }}>
                                    {resultsSections.map((section) =>  {
                                        return (
                                            <Box key={section.label}>
                                                <Typography variant='overline'>{section.label}</Typography>
                                                <MenuList sx={{ mx: -2, py: 0 }}>
                                                    {section.items.map((item) => {
                                                        return (
                                                            <MenuItem sx={{ px: 2 }} key={item.key} component={NextLink} href={item.link} onClick={() => setOpen(false)}>
                                                                <ListItemText
                                                                    primary={item.label}
                                                                    secondary={item.description}
                                                                    
                                                                    secondaryTypographyProps={{
                                                                        sx: {
                                                                            overflow: "hidden", textOverflow: "ellipsis"
                                                                        }
                                                                    }}
                                                                />
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </MenuList>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            ) : (
                                <>
                                    {results && (
                                        <Box pb={2}>
                                            <Typography>No results found</Typography>
                                        </Box>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

