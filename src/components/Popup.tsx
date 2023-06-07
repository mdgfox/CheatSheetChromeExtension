import { Box, Typography, Link, useMediaQuery, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import React, {FC, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { DatabaseList } from './DatabaseList';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Popup: FC = () => {
    const isDark = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(() =>createTheme({palette: {mode: isDark ? 'dark' : 'light'}}), [isDark]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ padding: '10px', width: '250px', display: 'flex', flexDirection: 'column', alignContent: 'center',
                justifyContent: 'flex-start', alignItems: 'center', gap: '10px'}}
            >
                <img src="../icons/128.png" id="logo_image" />
                <Typography fontSize='16px' fontWeight='700' variant='h2'>Simple cheat sheet</Typography>
                <Typography fontSize='14px' fontWeight='500' textAlign='center'>
                    You can import your own files, but please, double check it's structure. All docs you can find on GitHub page.
                </Typography>

                <DatabaseList/>

                <Box gap='10px' display='flex' flexDirection='row' flexWrap='nowrap'>
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/mdgfox/CheatSheetChromeExtension"
                    >
                        <GitHubIcon sx={{color: isDark ? 'unset' : 'black'}}/>
                    </Link>

                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://www.linkedin.com/in/alex-khmelev/"
                    >
                        <LinkedInIcon/>
                    </Link>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

const root = createRoot(document.getElementById('root')!);

root.render(<StrictMode><Popup /></StrictMode>);
