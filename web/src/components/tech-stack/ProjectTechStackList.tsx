import { Box, Stack, Typography } from "@mui/material";
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
        <Box>
            {categories.map((category) => {
                return (
                    <Box key={category.name}>
                        <Typography variant='body1'>{category.name}</Typography>
                        <Box my={1}>
                            {category.libraries.map((library) => {
                                return (
                                    <Box pl={2} key={library.name}>
                                    
                                        <Typography variant='body1' sx={{ display: 'inline-flex', gap: 1 }}>
                                            <strong><span>{library.name} </span></strong>
                                            <Typography component='a' target='_blank' href={library.docsUrl} sx={{ color: 'action', display: 'inline-flex', gap: 0.5, alignItems: 'center' }}>
                                                    <InsertLink fontSize="small" />
                                                    {formatDocsUrl(library.docsUrl)}
                                            </Typography>
                                        </Typography>
                                        <Typography variant='body2'>{library.description}</Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}
