import { Input } from '@mui/material';

const BasicInput = () => {
	return (
		<Input
			fullWidth
			sx={{
				'&:before': {
					borderBottom: 0,
				},
				'&:hover': {
					borderBottom: 0,
				},
				'&:hover:not(.Mui-disabled):before': {
					borderBottom: 0,
				},
			}}
			inputProps={{
				sx: {
					borderBottom: 0,
					outiline: 'none',
					'&:before': {
						borderBottom: 0,
					},
				},
			}}
		/>
	);
};

export { BasicInput };
