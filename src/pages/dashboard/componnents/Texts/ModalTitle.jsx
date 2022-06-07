import { Typography, useMediaQuery, useTheme } from '@mui/material';

const ModalTitle = ({ children }) => {
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	return (
		<Typography
			fontSize={xlDown ? (lgDown ? 14 : 16) : 18}
			fontWeight="500"
			fontFamily="poppins"
			color="primary.fontMain"
			display="flex"
			justifyContent="center"
			alignItems="center">
			{children}
		</Typography>
	);
};

export { ModalTitle };
