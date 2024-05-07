import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { addNewProject } from "../app/projects/actions";

interface IAddProjectFormProps {
    // onSubmit: (value: string) => Promise<void>;
}

export default function AddProjectForm(props: IAddProjectFormProps) {
    return (
        <form action={addNewProject}>
            <Box>
                <TextField
                    variant='filled'
                    name='repoFullName'
                    label='Add a Project'
                    placeholder='username/repo'
                />
                <Button type='submit'>Submit</Button>
            </Box>
        </form>
    )
}
