import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	useTheme,
	useMediaQuery,
	TableContainer,
	Switch,
	Avatar,
	IconButton,
	Box,
	Modal,
	Paper,
	Grid,
	TextField,
} from '@mui/material';
import { ColumnTitle } from './componnents/Texts/ColumnTitle';
import { useContext, useEffect, useState } from 'react';
import { MenuDrawer } from './componnents/menuDrawer/MenuDrawer';
import UserToolbar from './componnents/userToolbar/UserToolbar';
import { useDrawerContext } from '../../shared/contexts';
import BaseLayout from './layout/BaseLayout';
import { ArrowBack, Close, Delete, Edit, Search } from '@mui/icons-material';
import { Text } from './componnents/Texts/Text';
import { ModalTitle } from './componnents/Texts/ModalTitle';
import { ToolbarSelect } from './componnents/ToolbarSelect';
import BasicToolbar from './componnents/BasicToolbar/BasicToolbar';
import { AdminService } from './services/api/administrador/AdminService';
import { parseCookies } from 'nookies';
import { AuthAdmContext } from '../../shared/contexts/AuthAdmContext';
import { AlertDialog } from './componnents/AlertDialog';
import AdmLayout from './layout/AdmLayout';

const dashboard = () => {
	const { handleSetDrawerOptions } = useDrawerContext();
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	const { message, setMessage} = useContext(AuthAdmContext);

	const [admins, setAdmins] = useState();
	const [admin, setAdmin] = useState();
	const [nome, setNome] = useState();
	const [email, setEmail] = useState();

	const [idAdmin, setIdAdmin] = useState();

	const [isUpdate, setIsUpdate] = useState();

	const [open, setOpen] = useState(false);
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
	const handleOpen = () => {setOpen(true); setNome(""); setEmail("")};
	const handleClose = () => {
		setOpen(false);
		setIsUpdate(false)
	};

	const [busca,setBusca] = useState();

	const createAdmin = () => {
		if (nome && email) {
			if (email.indexOf("@") > -1) {
				AdminService.create({
					nome: nome,
					email: email,
					senha: "123",
					status: 1,
					classificacao: "administrador"
				}).then((result) => {
					if (result instanceof Error) {
						setMessage({
							open: true,
							severity: 'warning',
							message: 'Falha ao cadastrar administrador.'
						});
					} else {
						setMessage({
							open: true,
							severity: 'success',
							message: 'Usuario cadastrado com sucesso.'
						});
					}
					setOpen(false);
					listAdmins();
				});
			} else {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Email inválido, preencha novamente.'
				});
			}
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha todos os campos.'
			});
		}
		}
	
		
	

	const updateAdmin = (id)=>{
		if(email && nome){
			if(email.indexOf("@") > -1){
				AdminService.update({
					nome: nome,
					email: email,
					senha: "123",
					status: 1,
					classificacao: "administrador"
				}, id).then((result) => {
					if(result instanceof Error){
						setMessage({
							open: true,
							severity: 'warning',
							message: 'Email inválido, preencha novamente.'
						});
					}else{
						setMessage({
							open: true,
							severity: 'success',
							message: 'Administrador atuzalizdo com sucesso'
						});
						listAdmins();
					}
				});
			}else{
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Email inválido, preencha novamente.'
				});
			}
		}else{
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha todos os campos.'
			});
		}
	
	};
	const listAdmins=() =>{
		AdminService.getAll(busca).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				console.log(result.message);
				return;
			} else {
				setAdmins(result);
				console.log(result);
			}
		});
	}

	const handleClickDelete = ()=>{
		AdminService.deleteById(idAdmin).then((result) => {
			if (result instanceof Error) {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Falha ao deletar administrador.'
				});
			} else {
				setMessage({
					open: true,
					severity: 'success',
					message: 'Administrador deletado com sucesso.'
				});
			 }
		 })
		listAdmins();
		setOpenDeleteConfirm(false);
	}

	const handleClickEdit = (id) => {
		setIsUpdate(true);
		AdminService.getById(id).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setNome(result.nome);
				setEmail(result.email);
				setIdAdmin(result.idUsuario);
			}
		});
		setOpen(true);
	}
	useEffect(()=>{
		listAdmins();
	}, [busca]);

	useEffect(() => {
		handleSetDrawerOptions([
			{
				icon: 'person_add_alt_1',
				path: '/dashboard/usuarios',
				label: 'Usuários',
			},
			{
				icon: 'school',
				path: '/dashboard/cursos',
				label: 'Cursos',
			},
			{
				icon: 'auto_stories',
				path: '/dashboard/materias',
				label: 'Matérias',
			},
			{
				icon: 'gpp_good',
				path: '/dashboard/administradores',
				label: 'Administradores',
			},
		]);
	}, []);
	return (
		<MenuDrawer>
			<AlertDialog	
						open={message.open}
						severity={message.severity}
						setOpen={setMessage}
						message={message.message}
					/>
			<AdmLayout onClick={handleOpen} >
				<BasicToolbar title="Administradores" busca={busca} setBusca={setBusca} />
				<TableContainer
					width="100%"
					height="90%"
					sx={{ maxHeight: '90%' }}>
					<Table stickyHeader>
						<TableHead backgroundColor="#fff">
							<TableRow>
								<TableCell  width={theme.spacing(25)}>
									<ColumnTitle> Nome</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(25)}>
									<ColumnTitle> E-mail</ColumnTitle>
								</TableCell>
								<TableCell  width={theme.spacing(8)}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								admins && admins.map((row, i)=>(
									<TableRow
										height={theme.spacing(9)}
										sx={{
											backgroundColor:
												i % 2 === 0 ? '#F1FBFF' : '#fff',
										}}
										>
										<TableCell size="small"width={theme.spacing(65)}>
											<Text>
												{row.nome}
											</Text>
										</TableCell>

										<TableCell size="small" width={theme.spacing(70)}>
											{row.email}
										</TableCell>
										<TableCell
											size="small"
											width={theme.spacing(15)}
											sx={{ overFlow: 'hidden' }}
											display="flex"
											flexDirection="row">
											<Box
												width={theme.spacing(30)}
												display="flex"
												justifyContent="flex-end">
												<IconButton
													onClick={()=>handleClickEdit(row.idUsuario)}
													children={<Edit />}
													sx={{ color: '#8BDF94' }}
												/>
												<IconButton
													children={<Delete />}
													sx={{ color: '#FF6969' }}
													onClick={()=>{ setOpenDeleteConfirm(true); setIdAdmin(row.idUsuario)}}
												/>
											</Box>
										</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
				<Modal
					open={openDeleteConfirm}
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="primary.modal"
					component={Box}>
					<Box
						width={theme.spacing(60)}
						height={theme.spacing(25)}
						backgroundColor="primary.contrastText"
						marginTop={-5}
						borderRadius={1}
						elevation={2}
						padding={2}
						component={Paper}>
						<Grid container width="100%" height="100%">
							<Grid
								item
								xs={12}
								height="22%"
								display="flex"
								alignItems="flex-start"
								justifyContent="space-between"
								padding={0.5}>
								<ModalTitle>Excluir Administrador</ModalTitle>
								<IconButton
									onClick={() => setOpenDeleteConfirm(false)}
									children={<Close />}
									sx={{ color: '#FF6969' }}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								height="50%"
								display="flex"
								alignItems="flex-start"
								justifyContent="space-between"
								padding={0.5}>
								<Text>
									O administrador será apagado permanentemente da
									plataforma. Tem certeza de que deseja
									exclui-lo?
								</Text>
							</Grid>
							<Grid
								item
								xs={12}
								height="25%"
								display="flex"
								alignItems="flex-start"
								justifyContent="flex-end"
								padding={1}>
								<Button
									variant="contained"
									sx={{ textTransform: "capitalize" }}
									onClick={handleClickDelete}>
									Excluir
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>
				<Modal
					open={open}
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="primary.modal"
					component={Box}>
					<Box
						width={theme.spacing(80)}
						height={theme.spacing(55)}
						backgroundColor="primary.contrastText"
						marginTop={-5}
						borderRadius={1}
						elevation={2}
						padding={2}
						component={Paper}>
						<Grid container width="100%" height="100%">
							<Grid
								item
								xs={12}
								height="8%"
								display="flex"
								alignItems="flex-start"
								justifyContent="space-between"
								padding={1}>
								<ModalTitle>
									{isUpdate?"Editar Administrador":"Cadastro de Administradores"}
								</ModalTitle>
								<IconButton
									onClick={handleClose}
									children={<Close />}
									sx={{ color: '#FF6969' }}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								height="60%"
								padding={3}
								display="flex"
								flexDirection="column"
								gap={4}>
								<TextField
									fullWidth
									variant="standard"
									label="Nome"
									size="large"
									value={nome}
									onChange={(e)=>setNome(e.target.value)}
								/>
								<TextField
									fullWidth
									variant="standard"
									label="E-mail"
									size="large"
									value={email}
									onChange={(e)=>setEmail(e.target.value)}
								/>
								
							</Grid>

							<Grid
								item
								xs={12}
								height="20%"
								display="flex"
								flexDirection="column"
								justifyContent="flex-start"
								alignItems="flex-end"
								padding={3}>
								<Button variant="contained" sx={{ textTransform: "capitalize" }}   onClick={() => { isUpdate ? updateAdmin(idAdmin) : createAdmin() }}>{isUpdate? "Atualizar" : "Cadastrar"}</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>
			</AdmLayout>
		</MenuDrawer>
	);
};

export const getServerSideProps = async ({ req }) => {
	const { ['teclearn.token']: token } = parseCookies({ req });

	if (!token) {
		return {
			redirect: {
				destination: '/dashboard/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default dashboard;
