import { Stack, Typography } from "@mui/material";
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
        <ul>
            {categories.map((category) => {
                return (
                    <li>
                        <Typography variant='h5'>{category.name}</Typography>
                        <ul>
                            {category.libraries.map((library) => {
                                return (
                                    <li>
                                    
                                        <Typography variant='h6' sx={{ display: 'inline-flex', gap: 1 }}>
                                            <span>{library.name} </span>
                                            <Typography component='a' target='_blank' href={library.docsUrl} sx={{ color: 'action', display: 'inline-flex', gap: 0.5, alignItems: 'center' }}>
                                                    <InsertLink fontSize="small" />
                                                    {formatDocsUrl(library.docsUrl)}
                                            </Typography>
                                        </Typography>
                                        <Typography variant='body2'>{library.description}</Typography>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
