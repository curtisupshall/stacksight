import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export type ISearchProps = {
    //
}

const Search = (props: ISearchProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission behavior

        // Extracts the search query from the form
    }

    return (
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <TextField
                placeholder='Search projects or technologies'
                name='app-search'
                fullWidth
                InputProps={{
                    sx: { borderRadius: 56 },
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </form>
    )
}

export default Search;
