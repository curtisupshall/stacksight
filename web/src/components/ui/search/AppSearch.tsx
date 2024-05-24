'use client'

import { Box, CircularProgress, Dialog, DialogContent, Grow, IconButton, InputAdornment, ListItemText, MenuItem, MenuList, Stack, TextField, Typography } from "@mui/material";
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
            <a style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
                <SearchLaunchButton placeholderText={placeholderText} />
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
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {resultsSections.length > 0 ? (
                                <>
                                    {resultsSections.map((section) =>  {
                                        return (
                                            <Box key={section.label}>
                                                <Typography variant='overline'>{section.label}</Typography>
                                                <MenuList>
                                                    {section.items.map((item) => {
                                                        return (
                                                            <MenuItem key={item.key} component={NextLink} href={item.link} onClick={() => setOpen(false)}>
                                                                <ListItemText primary={item.label} secondary={item.description} />
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </MenuList>
                                            </Box>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {results && (
                                        <Box>
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

