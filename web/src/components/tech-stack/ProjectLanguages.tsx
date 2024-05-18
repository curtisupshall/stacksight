'use client'

import { BarChart } from "@mui/x-charts";
import { IProjectLanguage } from "../../types/project-scan";
import { languages } from "../../constants/linguist";

interface IProjectLanguagesProps {
    languages: IProjectLanguage[];
}

export default function ProjectLanguages(props: IProjectLanguagesProps) {
    console.log('langs:')
    console.log(languages)

    const minLineCount = props.languages.reduce((min, lang) => {
        if (lang.num_lines < min) {
            return lang.num_lines
        }

        return min
    }, props.languages[0].num_lines)
    return (
        <div>
            {JSON.stringify(props.languages)}
        
            <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: '2px' }}>
                {props.languages.map((lang) => {
                    return (
                        <div
                            style={{
                                flex: Math.ceil(lang.num_lines / minLineCount),
                                backgroundColor: languages?.[lang.language]?.color,
                                height: '16px'
                            }} />
                    )
                })}
            </div>
        </div>
    )
}
