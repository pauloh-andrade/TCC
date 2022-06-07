import { Close, Delete } from '@mui/icons-material';
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
	TextField,
	Button,
	Switch,
	Toolbar,
} from '@mui/material';
import { blue, deepOrange, green, pink, yellow } from '@mui/material/colors';
import { useContext, useState } from 'react';
import { AuthAdmContext } from '../../../../shared/contexts/AuthAdmContext';
import { UserService } from '../../services/api/user/UserService';
import { ReputationBar } from '../ReputationBar';
import { ModalTitle } from '../Texts/ModalTitle';
import { ToolbarSelect } from '../ToolbarSelect';

const EditUser = ({ setOpenUserCard, listUsers, data, handleClickEdit }) => {
	const theme = useTheme();
	const { message, setMessage } = useContext(AuthAdmContext);

	const [idUsuarioComum, setIdUsuarioComum] = useState(data.idUsuarioComum);
	const [nome, setNome] = useState(data.tblUsuario.nome);
	const [foto, setFoto] = useState(data.foto);
	const [tag, setTag] = useState(data.apelido);
	const [email, setEmail] = useState(data.tblUsuario.email);
	const [sobre, setSobre] = useState(data.biografia);
	const [moderador, setModerador] = useState(data.moderador);
	const [classificacao, setClassificacao] = useState(
		data.tblUsuario.classificacao
	);

	// setIdUsuarioComum(data.idUsuarioComum);
	// setNome(data.tblUsuario.nome);
	// setFoto(data.foto);
	// setTag(data.apelido);
	// setEmail(data.tblUsuario.email);
	// setSobre(data.biografia);
	// setModerador(data.moderador);
	// setClassificacao(data.tblUsuario.classificacao);

	const updateUser = () => {
		if (nome) {
			if (email) {
				if (email.indexOf('@') > -1) {
					const result = UserService.update(
						{
							nome,
							email,
							classificacao,
							moderador,
							status: data.tblUsuario.status,
							biografia: sobre,
							apelido: tag,
						},
						data.tblUsuarioIdUsuario
					).then(() => {
						if (result instanceof Error) {
							setMessage({
								open: true,
								severity: 'warning',
								message: 'Falha ao atualizar usuário.',
							});
						} else {
							setMessage({
								open: true,
								severity: 'success',
								message: 'Usuário atualizado com sucesso.',
							});
							listUsers();
							setOpenUserCard(false);
						}
					});
				} else {
					setMessage({
						open: true,
						severity: 'warning',
						message: 'E-mail inválido preencha novamente.',
					});
					setEmail('');
				}
			} else {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'o campo email é obrigatório.',
				});
			}
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'O campo nome é obrigatório.',
			});
		}
	};

	const removeUserImage = () => {
		UserService.removeImage(idUsuarioComum).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setFoto('');
				console.log(data.tblUsuario.idUsuario);
				handleClickEdit(data.idUsuarioComum);
			}
		});
	};

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
						bgcolor:
							data.idUsuarioComum % 10 == 1 ||
							data.idUsuarioComum % 10 == 3
								? green[500]
								: data.idUsuarioComum % 10 == 2 ||
								  data.idUsuarioComum % 10 == 4
								? pink[500]
								: data.idUsuarioComum % 10 == 5 ||
								  data.idUsuarioComum % 10 == 7
								? deepOrange[500]
								: data.idUsuarioComum % 10 == 6 ||
								  data.idUsuarioComum % 10 == 8
								? yellow[500]
								: data.idUsuarioComum % 10 == 9 ||
								  data.idUsuarioComum % 10 == 0
								? blue[500]
								: '',
					}}
					alt={nome}
					src={'http://10.107.144.27:8080/uploads/' + foto}
				/>
				{foto && (
					<Box
						width={theme.spacing(19)}
						height={theme.spacing(19)}
						backgroundColor="#b0b0b06d"
						position="absolute"
						borderRadius={50}
						sx={{
							marginLeft: 3.5,
							marginTop: 5.4,
							cursor: 'pointer',
							opacity: 0,
							'&:hover': {
								opacity: 1,
							},
						}}
						display="flex"
						justifyContent="center"
						alignItems="center"
						onClick={() => {
							removeUserImage();
						}}>
						<Icon
							sx={{
								'&.material-icons': {
									fontSize: 70,
									color: '#2b2b2b',
								},
							}}>
							delete
						</Icon>
					</Box>
				)}

				<ToolbarSelect
					label={classificacao}
					setLabel={setClassificacao}
					options={[
						{
							name: 'Aluno',
						},
						{
							name: 'Professor',
						},
					]}
					alignSelf="self-end"
					marginRight={4}
					marginTop={8}
					fontSize={18}
					fontFamily="roboto"
					color="primary.contrastText"
				/>
			</Box>
			<Box
				width="100%"
				height="70%"
				display="flex"
				flexDirection="column"
				padding={7}
				paddingTop={9}>
				<Grid container width="100%" height="100%" spacing={1}>
					<Grid item xs={7}>
						<TextField
							fullWidth
							label="Nome"
							placeholder="Nome e sobrenome"
							value={nome}
							onChange={e => setNome(e.target.value)}
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							fullWidth
							label="Tag"
							placeholder="Tag do Usuário"
							value={tag}
							onChange={e => setTag(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Email"
							placeholder="email.example@domain.com"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							multiline
							rows={3}
							label="Sobre"
							placeholder="Sobre o usuário"
							value={sobre}
							onChange={e => setSobre(e.target.value)}
						/>
					</Grid>

					<Grid
						item
						xs={6}
						display="flex"
						flexDirection="column"
						justifyContent="flex-start"
						alignItems="flex-start">
						<ModalTitle>Moderador</ModalTitle>
						<Switch
							checked={moderador}
							onChange={e =>
								moderador
									? setModerador(e.target.checked)
									: setModerador(e.target.checked)
							}
						/>
					</Grid>
					<Grid
						item
						xs={6}
						height="32%"
						display="flex"
						flexDirection="column"
						justifyContent="flex-start"
						alignItems="flex-end"
						gap={1}>
						<Button
							sx={{ textTransform: 'capitalize' }}
							variant="contained"
							onClick={() => updateUser()}>
							Atualizar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export { EditUser };
