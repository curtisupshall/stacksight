import { addNewOrganization } from "@/server/actions/organizationActions";
import { Button, Stack, TextField } from "@mui/material";

export default function AddOrganizationForm() {
    return (
        <form action={addNewOrganization}>
            <Stack justifyContent='flex-end' direction='row' alignItems='center' gap={1}>
                <TextField
                    variant='filled'
                    size="small"
                    name='orgName'
                    label='Add an Organization'
                    placeholder='orgname'
                    sx={{
                        minWidth: '400px'
                    }}
                />
                <Button variant='contained' color='primary' type='submit'>Add</Button>
            </Stack>
        </form>
    )
}
