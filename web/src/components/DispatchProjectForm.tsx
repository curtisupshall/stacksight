import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { addNewProject } from "../app/projects/actions";

interface IDispatchProjectFormProps {
    // onSubmit: (value: string) => Promise<void>;
}

export default function DispatchProjectForm(props: IDispatchProjectFormProps) {
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
