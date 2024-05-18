'use client'

import { BarChart } from "@mui/x-charts";
import { IProjectLanguage } from "../../types/project-scan";

interface IProjectLanguagesProps {
    languages: IProjectLanguage[];
}

export default function ProjectLanguages(props: IProjectLanguagesProps) {
    return (
        <div>
            {JSON.stringify(props.languages)}
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
                />
        </div>
    )
}
