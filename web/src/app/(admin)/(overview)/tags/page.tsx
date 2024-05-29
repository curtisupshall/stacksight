import ProjectTechStack from "@/components/tech-stack/ProjectTechStackList";
import { SOFTWARE_LIBRARIES } from "@/constants/libs";
import { Stack, Typography } from "@mui/material";


export default function DashboardPage() {
    return (
        <section>
            <Stack alignItems='center' mb={6} direction='row' justifyContent='space-between'>
                <Typography variant='h4' mb={0}><strong>All Tags</strong></Typography>
            </Stack>
            <ProjectTechStack tags={Object.keys(SOFTWARE_LIBRARIES)} />
        </section>
    )
}
