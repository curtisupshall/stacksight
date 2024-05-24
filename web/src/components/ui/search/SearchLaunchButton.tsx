import { Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface ISearchLaunchButtonProps {
    placeholderText: string;
}

export default function SearchLaunchButton(props: ISearchLaunchButtonProps)  {
    return (
        <Stack
            direction='row'
            gap={0.5}
            sx={{
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderRadius: 16,
                color: 'rgba(0, 0, 0, 0.65)',
                py: 0.75,
                pl: 2,
                pr: 8
            }}
        >
            <SearchIcon color='inherit' />
            <Typography sx={{ userSelect: 'none' }}>{props.placeholderText}</Typography>
        </Stack>
    )
}
