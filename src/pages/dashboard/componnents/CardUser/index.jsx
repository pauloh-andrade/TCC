import { Close } from '@mui/icons-material';
import {
	Typography,
	Icon,
	Box,
	Paper,
	useTheme,
	useMediaQuery,
	Avatar,
	Grid,
	IconButton,
} from '@mui/material';
import { blue, deepOrange, green, pink, yellow } from '@mui/material/colors';
import { ReputationBar } from '../ReputationBar';

const CardUser = ({ setOpenUserCard, data }) => {
	const theme = useTheme();
	console.log(data);

	return (
		<Box
			width={theme.spacing(100)}
			height={theme.spacing(70)}
			backgroundColor="#fff"
			component={Paper}
			elevation={2}
			overflow="hidden"
			borderRadius={2}>
			<Box
				sx={{
					backgroundImage:
						'linear-gradient(135deg, #6AC1FF, #1A76E3 90%)',
				}}
				width="100%"
				height="27%"
				display="flex"
				flexDirection="column"
				padding={2}>
				<Box
					width="100%"
					height="30%"
					display="flex"
					flexDirection="column"
					alignItems="flex-end">
					<IconButton
						onClick={() => setOpenUserCard(false)}
						children={<Close />}
						sx={{ color: '#FFF' }}
					/>
				</Box>
				<Avatar
					sx={{
						height: theme.spacing(20),
						width: theme.spacing(20),
						border: '4px solid #fff',
						marginLeft: 3,
						marginTop: 5,
						position: 'absolute',
						bgcolor:data.idUsuarioComum % 10 == 1 || data.idUsuarioComum % 10 == 3 ? green[500] :
								data.idUsuarioComum % 10 == 2 || data.idUsuarioComum % 10 == 4 ? pink[500] :
								data.idUsuarioComum % 10 == 5 || data.idUsuarioComum % 10 == 7 ? deepOrange[500] :
								data.idUsuarioComum % 10 == 6 || data.idUsuarioComum % 10 == 8 ? yellow[500] :
								data.idUsuarioComum % 10 == 9 || data.idUsuarioComum % 10 == 0 ? blue[500] : ''
					}}
					alt={data.tblUsuario.nome}
					src={'http://10.107.144.27:8080/uploads/' + data.foto} />
				
				<Typography
					alignSelf="self-end"
					marginRight={4}
					marginTop={8}
					fontSize={18}
					fontFamily="roboto"
					color="primary.contrastText">
					{data.tblUsuario.classificacao == 'aluno'
						? 'Aluno'
						: 'Professor'}
				</Typography>
			</Box>
			<Box
				width="100%"
				height="70%"
				display="flex"
				flexDirection="column"
				padding={7}>
				<Typography
					marginTop={2}
					fontSize={20}
					fontFamily="roboto"
					fontWeight={500}
					color="primary.fontMain"
					display="flex">
					{data.tblUsuario.nome}
					<Typography
						marginLeft={1}
						fontSize={18}
						fontFamily="roboto"
						fontWeight={400}
						color="#B6B6B6">
						{data.apelido}
					</Typography>
				</Typography>
				<Typography
					marginTop={0.5}
					fontSize={18}
					fontFamily="roboto"
					fontWeight={400}
					color="#B6B6B6">
					{data.tblUsuario.email}
				</Typography>
				<Typography
					marginTop={1}
					fontSize={16}
					fontFamily="roboto"
					fontWeight={500}
					color="primary.fontMain">
					Biografia
				</Typography>
				<Box
					marginTop={2}
					width="100%"
					height={theme.spacing(50)}
					sx={{
						border: 2,
						borderRadius: 1,
						borderStyle: 'dashed',
						borderColor: '#c2c2c2',
						padding: 1
					}}>
					<Typography
					fontSize={15}
					fontFamily="roboto"
					fontWeight={400}
					color="primary.fontMain">
					{data.biografia}
					</Typography>
					</Box>
				<Grid container width="100%" height="30%" marginTop={1}>
					<Grid
						item
						height={theme.spacing(5)}
						xs={7}
						display="flex"
						gap={3}
						alignItems="center">
						<Typography
							marginTop={0.5}
							fontSize={16}
							fontFamily="roboto"
							fontWeight={500}
							color="primary.fontMain">
							Reputação
						</Typography>
						<ReputationBar
							color={
								data.reputacao < 33
									? '#FF6969'
									: data.reputacao < 66
									? '#FFF069'
									: '#65DF80'
							}
						/>
					</Grid>
					<Grid
						item
						height={theme.spacing(5)}
						xs={5}
						display="flex"
						alignItems="center"
						justifyContent="flex-end">
						{data.moderador && (
							<Typography
								marginTop={0.5}
								fontSize={16}
								fontFamily="roboto"
								fontWeight={500}
								color="primary.fontMain">
								Moderador
							</Typography>
						)}
					</Grid>
					<Grid
						item
						height={theme.spacing(5)}
						xs={7}
						display="flex"
						gap={11}>
						<Typography
							marginTop={0.5}
							fontSize={16}
							fontFamily="roboto"
							fontWeight={500}
							color="primary.fontMain">
							Pontuação
						</Typography>
						<Typography
							marginTop={0.5}
							fontSize={16}
							fontFamily="roboto"
							fontWeight={500}
							color="primary.fontMain">
							{data.pontuacao}
						</Typography>
					</Grid>
					<Grid
						item
						height={theme.spacing(5)}
						xs={5}
						display="flex"
						justifyContent="flex-end">
						<Typography
							marginTop={0.5}
							fontSize={16}
							fontFamily="roboto"
							fontWeight={400}
							color="primary.fontMain">
							{data.tblUsuario.status ? 'Ativo' : 'Desativado'}
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export { CardUser };
