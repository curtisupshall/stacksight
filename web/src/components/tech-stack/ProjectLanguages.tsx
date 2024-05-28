'use client'

import { IProjectLanguage } from "../../types/project-scan";
import { languages } from "../../constants/linguist";
import { useMemo } from "react";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";

interface IProjectLanguagesProps {
    languages: IProjectLanguage[];
}

export default function ProjectLanguages(props: IProjectLanguagesProps) {
    const languageData = useMemo(() => {
        const languageDetails: { name: string, color: string, percentage: number }[] = [];
        const chartData: { flex: number, color: string }[] = [];
        
        let minLineCount = props.languages[0].num_lines;
        let totalLanguageLineCount = 0;
        let otherCategoryLineCount = 0;

        props.languages.forEach((language) => {
            totalLanguageLineCount += language.num_lines;

            if (language.num_lines < minLineCount) {
                minLineCount = language.num_lines;
            }
        })

        props.languages
            .sort((a, b) => b.num_lines - a.num_lines)
            .forEach((language) => {
                const percentage = 100 * language.num_lines / totalLanguageLineCount
                if (percentage > 1) {
                    chartData.push({
                        flex: Math.ceil(language.num_lines / minLineCount),
                        color: languages?.[language.language_name]?.color,
                    })
                }

                if (percentage > 0.5) {
                    languageDetails.push({
                        name: language.language_name,
                        color: languages?.[language.language_name]?.color,
                        percentage
                    });
                } else {
                    otherCategoryLineCount += language.num_lines
                }
            });

        const otherPercentage = otherCategoryLineCount > 0.1 * totalLanguageLineCount
            ? otherCategoryLineCount / totalLanguageLineCount
            : undefined

        if (otherPercentage) {
            chartData.push({
                flex: otherCategoryLineCount / minLineCount,
                color: '#EEE'
            })
            languageDetails.push({
                color: '#EEE',
                name: 'Other',
                percentage: otherPercentage
            })
        }

        return {
            chartData,
            languageDetails,
            // otherPercentage: otherPercentage > 0.5 ? otherPercentage : undefined
        }
    }, [props.languages])

    
    return (
        <Box my={2}>        
            <Stack my={1} direction='row' gap={'2px'} style={{ display: 'flex', flexFlow: 'row nowrap', gap: '2px', height: 12, borderRadius: '8px', overflow: 'hidden' }}>
                {languageData.chartData.map((bar) => {
                    return (
                        <Box
                            key={`${bar.color}-${bar.flex}`}
                            style={{ backgroundColor: bar.color }}
                            sx={{ flex: bar.flex, height: 12 }}
                        />
                    );
                })}
            </Stack>
            <Stack direction='row' my={1}>
                {languageData.languageDetails.map((language) => {
                    return (
                        <Stack key={language.name} direction='row' alignItems='center' gap={0.5}>
                            <Box sx={{ borderRadius: '50%', width: 24, height: 24, backgroundColor: language.color }} />
                            <Typography sx={{ fontWeight: 500 }}>
                                {language.name}&nbsp;
                                <Typography component='span' variant='body2' color='action'>
                                    {`${language.percentage.toFixed(1)}%`}
                                </Typography>
                            </Typography>
                        </Stack>
                    )
                })}
            </Stack>
        </Box>
    )
}
