import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment, TextField } from "@mui/material";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const CPAutocomplete= (props: IApplicationState) => {
    const { clients } = props;
    const clientNames = clients.map((a) => `${a.firstName} ${a.lastName}` );

    return (
        <Autocomplete
            freeSolo
            id="free-solo-demo"
            options={clientNames}
            sx={{ width: 300 }}
            renderInput={params => (
            <TextField 
                {...params}
                fullWidth
                // InputProps={{
                //   endAdornment: <InputAdornment position="end"><SearchSharpIcon/></InputAdornment>
                // }}
                placeholder="Search clients…" variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <SearchSharpIcon />
                      </InputAdornment>
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
            />
            )}
        />
    );
  };
  

  export default CPAutocomplete;