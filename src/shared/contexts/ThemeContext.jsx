import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { LightTheme } from "../themes";

export const AppThemeProvider = ({children}) =>{
    return(
        <ThemeProvider theme={LightTheme}>
            <Box width="100vw" height="100vh" bgcolor={LightTheme.palette.background.default}>
                {children}
            </Box>
        </ThemeProvider>
    );
};  