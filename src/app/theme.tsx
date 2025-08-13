'use client'

import { createTheme } from "@mui/material";

const useTheme = () => {
    const theme = createTheme({
        cssVariables: true,
        palette: {
            mode: 'light'
        }
    });
    return {
        theme
    }
}

export default useTheme