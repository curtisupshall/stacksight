import { Box, Stack } from "@mui/material";
import SignInButton from "../auth/SignInButton"
import SignOutButton from "../auth/SignOutButton"
import UserAvatar from "../auth/UserAvatar";
import { ISoftwareOrganizationRecord } from "@/types/organization";
import OrganizationsListCard from "./OrganizationsListCard";

interface IOrganizationsListProps {
    orgs: ISoftwareOrganizationRecord[]
}

export default function OrganizationsList(props: IOrganizationsListProps) {
    return (
        <Box>
            <Stack component='ul' gap={2} sx={{ p: 0, m: 0 }}>
                {props.orgs.map((organization) => {
                    return (
                        <OrganizationsListCard key={organization.software_organization_id} {...organization} />
                    )
                })}
            </Stack>
        </Box>
    )
}
