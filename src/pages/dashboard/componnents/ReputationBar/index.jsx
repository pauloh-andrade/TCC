import { Box, useTheme } from '@mui/material';

const ReputationBar = ({ color }) => {
	const theme = useTheme();
	return (
		<Box
			width={theme.spacing(15)}
			height={theme.spacing(2)}
			borderRadius={3}
			backgroundColor={color}></Box>
	);
};

export { ReputationBar };
