import { Typography, useMediaQuery, useTheme } from '@mui/material';

const Text = ({ children }) => {
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	return (
		<Typography fontSize={13} fontFamily="roboto" color="primary.fontMain">
			{children}
		</Typography>
	);
};

export { Text };
