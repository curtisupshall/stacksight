'use server'

import { ProjectScanContributorRecord } from "@/types/contributor";
import { Avatar, AvatarGroup, Stack, avatarClasses } from "@mui/material"
import Link from "next/link";

interface IProjectContributorsProps {
    contributors: ProjectScanContributorRecord[]
}

export default async function ProjectContributors(props: IProjectContributorsProps) {

    return (
        <Stack direction='row' flexWrap='wrap' flexDirection='row' gap={1}>
            {props.contributors.map(async (contributor) => {
                return (
                    <Avatar
                        key={contributor.login}
                        component={Link}
                        href={contributor.htmlUrl}
                        src={contributor.avatarUrl}
                    />
                )
            })}
        </Stack>
    )
}
