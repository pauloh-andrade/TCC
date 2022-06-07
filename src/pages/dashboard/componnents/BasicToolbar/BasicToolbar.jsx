import { useTheme } from '@emotion/react';

import { Box, Grid, Icon, IconButton, InputBase } from '@mui/material';
import { TableTitle } from '../Texts/TableTitle';

const BasicToolbar = ({ title, busca, setBusca}) => {
	const theme = useTheme();

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid
					item
					xs={8.6}
					height={theme.spacing(7)}
					display="flex"
					justifyContent="space-between"
					alignItems="centers">
					<TableTitle>{title}</TableTitle>
				</Grid>
				<Grid
					item
					xs={3.4}
					height={theme.spacing(7)}
					display="flex"
					justifyContent="space-between"
					alignItems="centers">
					
					<Box
						width="95%"
						height={32}
						backgroundColor="#E8EBEE"
						borderRadius={2}
						>
						<IconButton size="small">
							<Icon >search</Icon>
						</IconButton>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Pesquisar..."
							inputProps={{ 'aria-label': 'search google maps' }}
							fontSize="18px"
							onChange={(e)=> setBusca(e.target.value)}
							value={busca}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default BasicToolbar;
