'use server'

import { DbConnection } from "@/server/database/db";
import { ContributorService } from "@/server/services/contributor-service";
import { IProjectScanContributor } from "@/types/contributor";
import { ISoftwareProject } from "@/types/software-project";
import { Avatar, AvatarGroup } from "@mui/material"
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
            <AvatarGroup max={20}>
                {contributors.map((contributor) => {
                    return (
                        <Avatar
                            component={Link}
                            href={contributor.html_url}
                            
                            // src={}
                        />
                    )
                })}
            </AvatarGroup>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}