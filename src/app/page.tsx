'use client'
import { Autocomplete, Box, CircularProgress, TextField, Typography } from "@mui/material";
import styles from "./page.module.css";
import useHome from "./page.hook";

export default function Home() {
  const {listCountry} = useHome()

   const countries = [
    { label: 'Indonesia', code: 'ID' },
    { label: 'United States', code: 'US' },
    { label: 'Japan', code: 'JP' },
    { label: 'Germany', code: 'DE' },
    { label: 'Australia', code: 'AU' },
    { label: 'Brazil', code: 'BR' },
    { label: 'United Kingdom', code: 'GB' },
    { label: 'France', code: 'FR' },
  ];
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
            paddingX: 5,
            pb: 5,
            gap: 5,
            display: 'flex',
            flexDirection: 'column'
        }}>
          <Typography variant="h3" color="black">Techinal Test</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Autocomplete
          options={countries || []}
          getOptionLabel={(list) => list.label}
          isOptionEqualToValue={(option, value) =>
            option && value ? option.label == value.label : false
          }
          // onOpen={() => getRolesListDropdown()}
          // onInputChange={(_, Role) => setFilter({ ...filter, Role })}
          // value={rolesList && rolesList.data && rolesList.data.find((e) => e.name == filter.Role)}
          renderOption={(props, item) => (
            <li {...props} key={item.code}>
              {item.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              name='Role'
              label='Negara'
              InputProps={{
                ...params.InputProps,
                endAdornment: ( 
                  <>
                    {false && <CircularProgress color='inherit' size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            {/* <TextField id="outlined-search" label="Search field" type="search" /> */}
            {/* <TextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            /> */}
          </Box>

        </Box>

      </main>
    </div>

  );
}
