'use server'

import { DbConnection } from "@/server/database/db";
import { ContributorService } from "@/server/services/contributor-service";
import { IProjectScanContributor } from "@/types/contributor";
import { ISoftwareProject } from "@/types/software-project";
import { Avatar, AvatarGroup, Stack, avatarClasses } from "@mui/material"
import axios from "axios";
import Link from "next/link";

// interface IProjectContributorsProps {
//     projectScanId: number
// }

export default async function ProjectContributors(props: ISoftwareProject) {
    const connection = new DbConnection();
    
    try {
        await connection.open();
        const contributorService = new ContributorService(connection);

        let contributors: IProjectScanContributor[] = [];

        if (props.last_scan) {
            contributors = await contributorService.getContributorsByProjectScanId(props.last_scan?.software_project_scan_id)
        }

        return (
            <Stack direction='row' flexWrap='wrap' flexDirection='row' gap={1}>
                {contributors.map(async (contributor) => {
                    return (
                        <Avatar
                            key={contributor.login}
                            component={Link}
                            href={contributor.html_url}
                            // src={(await axios.get(`https://api.github.com/users/${contributor.login}`)).data.avatar_url}
                            src={contributor.avatar_url}
                        />
                    )
                })}
            </Stack>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}