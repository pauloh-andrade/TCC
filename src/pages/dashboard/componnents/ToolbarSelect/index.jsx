import {
	Typography,
	Icon,
	Box,
	Paper,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { useState } from 'react';

export function ToolbarSelect({ label, options, setLabel, color, ...other }) {
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	const [open, setOpen] = useState('none');
	const [selected, setSelected] = useState(label);

	const handleClickSelect = () => {
		if (open == 'block') {
			setOpen('none');
		} else {
			setOpen('block');
		}
	};

	const handleClickOption = e => {
		if (e.target.innerText == 'Ativo') {
			setLabel('1');
		} else if (e.target.innerText == 'Desativado') {
			setLabel('0');
		} else if (label == e.target.innerText) {
			setLabel('');
		} else {
			setLabel(e.target.innerText);
		}
		setSelected(e.target.innerText);
		handleClickSelect();
	};

	return (
		<Box
			sx={{
				cursor: 'pointer',
			}}
			{...other}>
			<Typography
				onClick={handleClickSelect}
				fontSize={14}
				fontWeight="500"
				fontFamily="poppins"
				color={color ? color : 'primary.fontMain'}
				display="flex"
				justifyContent="center"
				alignItems="center"
				textTransform="capitalize">
				{selected}
				<Icon>{open == 'none' ? 'chevron_right' : 'expand_more'}</Icon>
			</Typography>
			<Box
				backgroundColor="#fff"
				display={open}
				component={Paper}
				elevation={2}
				overflow="hidden"
				sx={{
					position: 'absolute',
					zIndex: 10,
				}}>
				{options.map(({ name }) => {
					return (
						<Box
							width="100%"
							height={theme.spacing(4)}
							padding={theme.spacing(0.8)}
							backgroundColor={
								name == selected ? '#f7F6F3' : '#fff'
							}>
							<Typography
								onClick={e => handleClickOption(e)}
								fontSize={16}
								fontWeight="400"
								fontFamily="poppins"
								color="primary.fontMain"
								paddingLeft={theme.spacing(0.5)}>
								{name}
							</Typography>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
