'use server'

import { Box, Breadcrumbs, Card, Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import OrganizationsListCardActions from "./OrganizationsListCardActions";
import { ISoftwareOrganizationRecord } from "@/types/organization";

export default async function OrganizationsListCard(props: ISoftwareOrganizationRecord) {
    return (
        <Card component='li' key={props.software_organization_id} sx={{ p: 2 }}>
            <Stack direction='row' gap={1}>
                <Box flex={2}>
                    <Stack direction='row' gap={1.5} alignItems='center'>
                        <Link href={`/orgs/${props.name}`}>
                            <Typography variant='h6'>{props.full_name}</Typography>
                        </Link>
                    </Stack>
                    <Typography variant='body2'>
                        {props.bio}
                    </Typography>
                </Box>
                {/* <Stack direction='row' gap={1} flex={3} pt={0.5}>
                    {props.tags?.filter(Boolean).map((tag) => (
                        <Chip size='small' label={tag} />
                    ))}
                </Stack> */}
                <Box>
                    <OrganizationsListCardActions {...props} />
                </Box>
            </Stack>
        </Card>
    )
}
