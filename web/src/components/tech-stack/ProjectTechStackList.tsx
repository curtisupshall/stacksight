import { Box, Grid, Link, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { SOFTWARE_CATEGORIES, SOFTWARE_LIBRARIES, SoftwareCategory, SoftwareLibrary } from "../../constants/libs";
import { categorizeProjectTags, formatDocsUrl } from "../../utils/Utils";
import { InsertLink } from "@mui/icons-material";


interface IProjectTechStackProps {
    tags: string[];
}

export default function ProjectTechStack(props: IProjectTechStackProps) {

    const categories = categorizeProjectTags(props.tags);

    // console.log(JSON.stringify(categories))

    return (
        <Table>
            <TableBody>
                {categories.map((category) => {
                    return (

                        <TableRow key={category.name}>
                            <TableCell sx={{ pl: 0, verticalAlign: 'top', position: 'sticky', top: 0 }}>
                                <Typography variant='body1' sx={{ backgroundColor: 'white' }}>{category.name}</Typography>
                            </TableCell>
                            <TableCell sx={{ pr: 0 }}>
                                <Stack gap={1}>
                                    {category.libraries.map((library) => {
                                        return (
                                            <Box key={library.name}>
                                                <Typography variant='body1' sx={{ display: 'inline-flex', gap: 1 }}>
                                                    <strong><Link href={`/tags/${library.slug}`}>{library.name}</Link></strong>
                                                    <Link component='a' target='_blank' href={library.docsUrl} sx={{ color: 'action', display: 'inline-flex', gap: 0.5, alignItems: 'center' }}>
                                                            <InsertLink fontSize="small" />
                                                            {formatDocsUrl(library.docsUrl)}
                                                    </Link>
                                                </Typography>
                                                <Typography variant='body2'>{library.description}</Typography>
                                            </Box>
                                        )
                                    })}
                                </Stack>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
