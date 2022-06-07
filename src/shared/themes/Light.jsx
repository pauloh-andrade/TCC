import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
	palette: {
		primary: {
			main: '#3D97F0',
			light: '#88bdf2',
			dark: '#3e7ab5',
			icon: '#ffffff',
			contrastText: '#ffffff',
			fontMain: '#404040',
		},
		secondary: {
			main: '#255E97',
			light: '#5589bd',
			dark: '#22507E',
			contrastText: '#ffffff',
		},
		info: {
			main: '#fff',
		},
		tertiary: {
			main: '#fff',
		},
		background: {
			default: '#f7F6F3',
		},
	},
});
