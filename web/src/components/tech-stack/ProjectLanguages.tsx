'use client'

import { languages } from "../../constants/linguist";
import { useMemo } from "react";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { ProjectScanLanguageRecord } from "@/types/languages";

interface IProjectLanguagesProps {
    languages: ProjectScanLanguageRecord[];
}

export default function ProjectLanguages(props: IProjectLanguagesProps) {
    const languageData = useMemo(() => {
        const languageDetails: { name: string, color: string, percentage: number }[] = [];
        const chartData: { flex: number, color: string }[] = [];
        
        let minLineCount = props.languages[0]?.numLines ?? 0;
        let totalLanguageLineCount = 0;
        let otherCategoryLineCount = 0;

        props.languages.forEach((language) => {
            totalLanguageLineCount += language.numLines;

            if (language.numLines < minLineCount) {
                minLineCount = language.numLines;
            }
        })

        props.languages
            .sort((a, b) => b.numLines - a.numLines)
            .forEach((language) => {
                const percentage = 100 * language.numLines / totalLanguageLineCount
                if (percentage > 1) {
                    chartData.push({
                        flex: Math.ceil(language.numLines / minLineCount),
                        color: languages?.[language.languageName]?.color,
                    })
                }

                if (percentage > 0.5) {
                    languageDetails.push({
                        name: language.languageName,
                        color: languages?.[language.languageName]?.color,
                        percentage
                    });
                } else {
                    otherCategoryLineCount += language.numLines
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
        <Box>        
            <Stack mb={1} direction='row' gap={'2px'} style={{ display: 'flex', flexFlow: 'row nowrap', gap: '2px', height: 12, borderRadius: '8px', overflow: 'hidden' }}>
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
            <Stack direction='row' my={1} rowGap={0} columnGap={1} flexWrap={'wrap'}>
                {languageData.languageDetails.map((language) => {
                    return (
                        <Stack key={language.name} direction='row' alignItems='center' gap={0.5}>
                            <Box sx={{ borderRadius: '50%', width: 16, height: 16, backgroundColor: language.color }} />
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
