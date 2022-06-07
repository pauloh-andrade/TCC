import { useTheme } from '@emotion/react';

import { Box, Grid, Icon, IconButton, InputBase } from '@mui/material';
import { ToolbarSelect } from '../ToolbarSelect';
import { TableTitle } from '../Texts/TableTitle';
import { useState } from 'react';

const UserToolbar = ({
	title,
	setOrder,
	setStatus,
	setModerador,
	setTipo,
	setBuscador,
}) => {
	const theme = useTheme();

	const [busca, setBusca] = useState('');

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={2.5} height={theme.spacing(4)}>
					<TableTitle>Usuários</TableTitle>
				</Grid>
				<Grid
					item
					xs={1.2}
					display="flex"
					justifyContent="center"
					alignItems="flex-start"
					flexDirection="column">
					<ToolbarSelect
						label="Tipo"
						setLabel={setTipo}
						options={[
							{
								name: 'Tipo',
							},
							{
								name: 'Aluno',
							},
							{
								name: 'Professor',
							},
						]}
					/>
				</Grid>

				<Grid
					item
					xs={1.4}
					display="flex"
					justifyContent="center"
					alignItems="flex-start"
					flexDirection="column">
					<ToolbarSelect
						label="Status"
						setLabel={setStatus}
						options={[
							{
								name: 'Status',
							},
							{
								name: 'Ativo',
							},
							{
								name: 'Desativado',
							},
						]}
					/>
				</Grid>
				<Grid
					item
					xs={1.4}
					display="flex"
					justifyContent="center"
					alignItems="flex-start"
					flexDirection="column">
					<ToolbarSelect
						label="Moderador"
						setLabel={setModerador}
						options={[
							{
								name: 'Moderador',
							},
							{
								name: 'Ativo',
							},
							{
								name: 'Desativado',
							},
						]}
					/>
				</Grid>
				<Grid
					item
					xs={2}
					display="flex"
					justifyContent="center"
					alignItems="flex-start"
					flexDirection="column">
					<ToolbarSelect
						label="Ordenar por"
						setLabel={setOrder}
						options={[
							{
								name: 'Ordenar por',
							},
							{
								name: 'Menor reputação',
							},
							{
								name: 'Maior reputação',
							},
							{
								name: 'Menor pontuação',
							},
							{
								name: 'Maior pontuação',
							},
						]}
					/>
				</Grid>
				<Grid item xs={3.4}>
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
							value={busca}
							onKeyPress={e =>
								e.key == 'Enter' ? setBuscador(busca) : ''
							}
							onChange={e => {
								// if(e.target.)
								setBusca(e.target.value);
							}}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default UserToolbar;
