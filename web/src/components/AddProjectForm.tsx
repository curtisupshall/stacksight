import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { addNewProject } from "../server/actions/projectActions";

interface IAddProjectFormProps {
    // onSubmit: (value: string) => Promise<void>;
}

export default function AddProjectForm(props: IAddProjectFormProps) {
    return (
        <form action={addNewProject}>
            <Stack direction='row' alignItems='center' gap={1}>
                <TextField
                    variant='filled'
                    size="small"
                    name='repoFullName'
                    label='Add a Project'
                    placeholder='username/repo@branch'
                    sx={{
                        minWidth: '400px'
                    }}
                />
                <Button variant='outlined' type='submit'>Add</Button>
            </Stack>
        </form>
    )
}
