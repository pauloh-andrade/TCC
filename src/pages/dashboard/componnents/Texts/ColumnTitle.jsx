import { Typography, useMediaQuery, useTheme } from '@mui/material';

const ColumnTitle = ({ children }) => {
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	return (
		<Typography
			fontSize={14}
			fontWeight="400"
			fontFamily="poppins"
			color="primary.fontMain">
			{children}
		</Typography>
	);
};

export { ColumnTitle };
