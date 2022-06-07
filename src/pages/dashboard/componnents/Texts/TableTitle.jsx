import { Typography, useMediaQuery, useTheme } from '@mui/material';

const TableTitle = ({ children }) => {
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	return (
		<Typography
			fontSize={24}
			fontFamily="poppins"
			color="primary.fontMain">
			{children}
		</Typography>
	);
};

export { TableTitle };
