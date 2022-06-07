import {
	useTheme,
	useMediaQuery,
	Box,
	Grid,
	Typography,
	IconButton,
	Icon,
	InputBase,
	Chip,
	Button,
	Paper,
	Modal,
	TextField,
} from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { MenuDrawer } from '../componnents/menuDrawer/MenuDrawer';
import { useDrawerContext } from '../../../shared/contexts';
import BaseLayout from '../layout/BaseLayout';
import { CursoService } from '../services/api/curso/CursoService';
import { useRouter } from 'next/router';
import {
	AddCircleOutline,
	ArrowBack,
	Close,
	Delete,
	Edit,
	Save,
} from '@mui/icons-material';
import { ModalTitle } from '../componnents/Texts/ModalTitle';
import { MateriaService } from '../services/api/materia/MateriaService';
import { CategoriaService } from '../services/api/categoria/CategoriaService';
import { parseCookies } from 'nookies';
import { Text } from '../componnents/Texts/Text';
import { AuthAdmContext } from '../../../shared/contexts/AuthAdmContext';
import { AlertDialog } from '../componnents/AlertDialog';

const dashboard = () => {
	const { handleSetDrawerOptions } = useDrawerContext();
	const theme = useTheme();
	const router = useRouter();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	const { message, setMessage } = useContext(AuthAdmContext);

	const [curso, setCurso] = useState();
	const [materias, setMaterias] = useState();
	const [materia, setMateria] = useState();
	const [materiasSelectable, setMateriasSelectable] = useState();
	const [busca, setBusca] = useState();
	const [buscaCategoria, setBuscaCategoria] = useState();
	const [openDeleteConfirm, setOpeDeleteConfirm] = useState(false);
	const [materiaId, setMateriaId] = useState();

	const [statusCreate, setStatusCreate] = useState();

	const [categorias, setCategorias] = useState();
	const [categoriaByMateria, setCategoriaByMateria] = useState();
	const [selectCategoria, setSelectCategoria] = useState([]);

	const [materiaNome, setMateriaNome] = useState();
	const [categoriaNome, setCategoriaNome] = useState();

	const [open, setOpen] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCadastrarCategoria, setOpenCadastrarCategoria] = useState(false);

	const id = useMemo(() => {
		return router.query.id;
	}, [router.query]);

	const handleRemoveCategoria = idCategoria => {
		CategoriaService.remove(materia, idCategoria).then(result => {
			if (result instanceof Error) {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Falha ao remover categoria',
				});
			} else {
				setTimeout(() => {
					getCategoriaByMateria(materia);
				}, 200);
				setMessage({
					open: true,
					severity: 'success',
					message: 'Categoria removida com sucesso.',
				});
			}
		});
	};

	const handleClickEdit = idDaMateria => {
		setOpenUpdate(true);
		findAllCategorias();

		setMateria(idDaMateria);
		MateriaService.getById(idDaMateria).then(result => {
			setMateriaNome(result.materiaNome);

			CategoriaService.getCategoriaByIdMateria(idDaMateria).then(
				result => {
					if (result instanceof Error) {
						alert(result.message);
						return;
					} else {
						let array = [];
						result.tblMateriasCategorias.map(row => {
							const id = { id: row.tblCategoriaIdCategoria };
							array.push(id);
						});
						setSelectCategoria(array);
					}
				}
			);
		});
	};
	const handleClickMateria = idMateria => {
		setMateria(idMateria);

		getCategoriaByMateria(idMateria);
	};
	const findAllMaterias = () => {
		MateriaService.getAll(busca).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setMaterias(result);
			}
		});
	};
	useEffect(() => {
		findAllMaterias();
	}, [id, statusCreate, busca]);

	useEffect(() => {
		findAllCategorias();
	}, [buscaCategoria]);

	const findAllCategorias = () => {
		CategoriaService.getAll(buscaCategoria).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCategorias(result);
			}
		});
	};

	const handleClickDelete = () => {
		MateriaService.deleteById(materiaId).then(result => {
			if (result instanceof Error) {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Falha ao deletar materia.',
				});
			} else {
				setMessage({
					open: true,
					severity: 'success',
					message: 'Materia deletada com sucesso.',
				});
				findAllMaterias();
				setOpeDeleteConfirm(false);
			}
		});
	};
	const handleClickChip = id => {
		var add = true;
		selectCategoria.length != 0 &&
			selectCategoria.map((idCategoria, key) => {
				if (idCategoria.id == id.id) {
					const a = selectCategoria;
					a.splice(key, 1);
					add = false;
					setSelectCategoria([]);
					setTimeout(() => {
						setSelectCategoria(a);
					}, 100);
				}
			});
		if (add) setSelectCategoria([...selectCategoria, id]);
	};

	const createMateria = () => {
		if (materiaNome) {
			MateriaService.create({
				materiaNome,
			}).then(result => {
				if (result instanceof Error) {
					setMessage({
						open: true,
						severity: 'warning',
						message: 'Falha ao cadastrar matéria.',
					});
				} else {
					selectCategoria.map(row => {
						MateriaService.createMateriaCategoria({
							tblMateriaIdMateria: result,
							tblCategoriaIdCategoria: row.id,
						}).then(result => {
							if (result instanceof Error) {
								setMessage({
									open: true,
									severity: 'warning',
									message: 'Falha ao cadastrar matéria',
								});
								return;
							}
						});
					});
					setMessage({
						open: true,
						severity: 'success',
						message: 'Materia cadastrada com sucesso.',
					});

					setStatusCreate(result);
					setMateriaNome('');
					setSelectCategoria([]);
				}
			});
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha o nome da matéria.',
			});
		}
	};

	const createCategoria = () => {
		if (categoriaNome) {
			CategoriaService.create({
				categoriaNome,
			}).then(result => {
				if (result instanceof Error) {
					setMessage({
						open: true,
						severity: 'warning',
						message: 'Falha ao cadastrar categoria.',
					});
				} else {
					setMessage({
						open: true,
						severity: 'success',
						message: 'Categoria cadastrada com sucesso.',
					});

					setCategoriaNome('');
				}
			});
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha o nome da categoria.',
			});
		}
	};

	const updateMateria = () => {
		if (materiaNome) {
			MateriaService.update(
				{
					materiaNome,
					categorias: selectCategoria,
				},
				materia
			).then(result => {
				if (result instanceof Error) {
					setMessage({
						open: true,
						severity: 'warning',
						message: 'Falha ao atuaizar matéria.',
					});
				} else {
					setMessage({
						open: true,
						severity: 'success',
						message: 'Matéria atualizada com sucesso.',
					});
					setOpenUpdate(false);
					setStatusCreate(result);
					setSelectCategoria([]);
					getCategoriaByMateria(materia);
				}
			});
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preenhca o nome da matéria.',
			});
		}
	};

	const getCategoriaByMateria = idDaMateria => {
		CategoriaService.getCategoriaByIdMateria(idDaMateria).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCategoriaByMateria(result.tblMateriasCategorias);
			}
		});
	};

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
			<BaseLayout
				sx={{ display: 'flex', padding: 0 }}
				title="Materia"
				removeButton>
				<AlertDialog
					open={message.open}
					severity={message.severity}
					setOpen={setMessage}
					message={message.message}
				/>
				<Box
					width="50%"
					height="100%"
					display="flex"
					flexDirection="column"
					justifyContent="space-between">
					<Grid container width="100%">
						<Grid
							item
							xs={12}
							height={theme.spacing(7.5)}
							display="flex">
							<Box
								width="100%"
								height={theme.spacing(7.5)}
								padding={2}
								display="flex"
								justifyContent="space-between">
								<Typography
									fontSize={21}
									fontWeight="500"
									fontFamily="poppins"
									color="primary.fontMain"
									display="flex">
									Matérias
								</Typography>
								<Box
									width="50%"
									height={33}
									backgroundColor="#E8EBEE"
									borderRadius={2}>
									<IconButton
										size="small"
										sx={{ marginTop: 0 }}>
										<Icon>search</Icon>
									</IconButton>
									<InputBase
										value={busca}
										onChange={e => setBusca(e.target.value)}
										sx={{ marginTop: -0.5, ml: 1, flex: 1 }}
										placeholder="Pesquisar..."
										inputProps={{
											width: '10px',
											'aria-label': 'search google maps',
										}}
										fontSize="18px"
									/>
								</Box>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							maxHeight={350}
							display="flex"
							flexDirection="column"
							alignItems="flex-start"
							justifyContent="space-between"
							sx={{ paddingBottom: 10 }}
							overflow="auto">
							{materias &&
								materias.length != 0 &&
								materias.map(row => (
									<Box
										width="100%"
										height={theme.spacing(6.5)}
										padding={1}
										paddingLeft={2}
										backgroundColor={
											materia == row.idMateria
												? '#F4F4F4'
												: ''
										}
										onClick={() => {
											handleClickMateria(row.idMateria);
										}}
										sx={{ cursor: 'pointer' }}
										display="flex"
										justifyContent="space-between">
										<Typography
											marginTop={1}
											fontSize={
												xlDown ? (lgDown ? 13 : 17) : 21
											}
											fontWeight="400"
											fontFamily="poppins"
											color="primary.fontMain"
											display="flex">
											{row.materiaNome}
										</Typography>
										<Box>
											<IconButton
												onClick={() => {
													handleClickEdit(
														row.idMateria
													);
												}}
												children={<Edit />}
												sx={{ color: '#8BDF94' }}
											/>
											<IconButton
												onClick={() => {
													setOpeDeleteConfirm(true);
													setMateriaId(row.idMateria);
												}}
												children={<Delete />}
												sx={{ color: '#FF6969' }}
											/>
										</Box>
									</Box>
								))}
						</Grid>
					</Grid>
					<Box
						width="100%"
						height={theme.spacing(7)}
						display="flex"
						justifyContent="flex-end"
						alignItems="flex-end"
						padding={2}>
						<Button
							sx={{
								fontSize: xlDown ? (lgDown ? 13 : 17) : 21,
								fontWeight: '500',
								fontFamily: 'poppins',
								textTransform: 'capitalize',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							onClick={() => {
								setOpen(true);
								findAllCategorias(), setMateriaNome('');
							}}
							endIcon={<AddCircleOutline />}>
							Cadastrar Matéria
						</Button>
					</Box>
				</Box>
				<Box
					width="50%"
					height="100%"
					backgroundColor="#F4F4F4"
					display="flex"
					justifyContent="space-between"
					flexDirection="column">
					<Grid container width="100%">
						<Grid
							item
							xs={12}
							height={theme.spacing(7)}
							display="flex"
							alignItems="flex-start">
							<Box
								width="100%"
								height={theme.spacing(5)}
								padding={2}
								display="flex"
								justifyContent="space-between">
								<Typography
									fontSize={21}
									fontWeight="500"
									fontFamily="poppins"
									color="primary.fontMain"
									display="flex">
									Categorias
								</Typography>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							display="flex"
							alignItems="flex-start"
							flexWrap="wrap"
							gap={1}
							padding={2}
							sx={{ paddingBottom: 10 }}>
							{categoriaByMateria &&
								categoriaByMateria.map(row => (
									<Chip
										key={row.idCategoria}
										size="small"
										color="primary"
										label={row.tblCategoria.categoriaNome}
										onDelete={() =>
											handleRemoveCategoria(
												row.tblCategoriaIdCategoria
											)
										}
									/>
								))}
						</Grid>
					</Grid>
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
									<ModalTitle>Cadastrar Matéria</ModalTitle>
									<IconButton
										onClick={() => {
											setOpen(false);
										}}
										children={<Close />}
										sx={{ color: '#FF6969' }}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									height="10%"
									padding={3}
									display="flex"
									flexDirection="column"
									gap={2}>
									<TextField
										value={materiaNome}
										onChange={e =>
											setMateriaNome(e.target.value)
										}
										fullWidth
										variant="standard"
										label="Nome da matéria"
									/>
								</Grid>
								<Grid
									marginTop={4}
									item
									xs={12}
									height="60%"
									padding={3}
									display="flex"
									flexDirection="column"
									gap={2}>
									<Box
										width="100%"
										height={30}
										display="flex"
										justifyContent="space-between">
										<ModalTitle>Categoria</ModalTitle>
										<Box
											width="60%"
											height={30}
											backgroundColor="#E8EBEE"
											borderRadius={2}>
											<IconButton
												sx={{ marginTop: -0.5 }}>
												<Icon>search</Icon>
											</IconButton>
											<InputBase
												value={buscaCategoria}
												onChange={e =>
													setBuscaCategoria(
														e.target.value
													)
												}
												sx={{
													marginTop: -0.5,
													ml: 1,
													flex: 1,
												}}
												placeholder="Pesquisar..."
												inputProps={{
													'aria-label':
														'search google maps',
												}}
												fontSize="18px"
											/>
										</Box>
									</Box>

									<Box
										maxHeight="40%"
										width="100%"
										display="flex"
										gap={1}
										flexWrap="wrap"
										// sx={{overflowX:"auto", overFlowY: "none"}}
									>
										{categorias &&
											categorias.map((row, i) => (
												<Chip
													key={i}
													label={row.categoriaNome}
													onClick={() =>
														handleClickChip({
															id: row.idCategoria,
														})
													}
													sx={selectCategoria.map(
														categoria => {
															if (
																categoria.id ==
																row.idCategoria
															) {
																return {
																	backgroundColor:
																		'#3D97F0',
																	color: '#fff',
																	'&.MuiChip-root:hover':
																		{
																			backgroundColor:
																				'#3D97F0',
																		},
																};
															}
														}
													)}
												/>
											))}
									</Box>
								</Grid>

								<Grid
									item
									xs={12}
									height="11%"
									display="flex"
									flexDirection="column"
									justifyContent="stretch"
									alignItems="stretch"
									paddingLeft={3}
									paddingRight={3}>
									<Button
										sx={{ textTransform: 'capitalize' }}
										variant="contained"
										onClick={() => createMateria()}>
										Cadastrar
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Modal>

					<Modal
						open={openUpdate}
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
									<ModalTitle>Editar Matéria</ModalTitle>
									<IconButton
										onClick={() => {
											setOpenUpdate(false);
											setSelectCategoria([]);
											setBuscaCategoria('');
										}}
										children={<Close />}
										sx={{ color: '#FF6969' }}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									height="10%"
									padding={3}
									display="flex"
									flexDirection="column"
									gap={2}>
									<TextField
										InputLabelProps={{ shrink: true }}
										value={materiaNome}
										onChange={e =>
											setMateriaNome(e.target.value)
										}
										fullWidth
										variant="standard"
										label="Nome"
									/>
								</Grid>
								<Grid
									marginTop={4}
									item
									xs={12}
									height="60%"
									padding={3}
									display="flex"
									flexDirection="column"
									gap={2}>
									<Box
										width="100%"
										height={30}
										display="flex"
										justifyContent="space-between">
										<ModalTitle>Categoria</ModalTitle>
										<Box
											width="60%"
											height={30}
											backgroundColor="#E8EBEE"
											borderRadius={2}>
											<IconButton
												sx={{ marginTop: -0.5 }}>
												<Icon>search</Icon>
											</IconButton>
											<InputBase
												value={buscaCategoria}
												onChange={e =>
													setBuscaCategoria(
														e.target.value
													)
												}
												sx={{
													marginTop: -0.5,
													ml: 1,
													flex: 1,
												}}
												placeholder="Pesquisar..."
												inputProps={{
													'aria-label':
														'search google maps',
												}}
												fontSize="18px"
											/>
										</Box>
									</Box>

									<Box
										maxHeight="40%"
										width="100%"
										display="flex"
										gap={1}
										flexWrap="wrap"
										sx={{
											overflowX: 'auto',
											overFlowY: 'none',
										}}
										F>
										{categorias &&
											categorias.map((row, i) => (
												<Chip
													key={i}
													label={row.categoriaNome}
													onClick={() =>
														handleClickChip({
															id: row.idCategoria,
														})
													}
													sx={selectCategoria.map(
														categoria => {
															if (
																categoria.id ==
																row.idCategoria
															) {
																return {
																	backgroundColor:
																		'#3D97F0',
																	color: '#fff',
																	'&.MuiChip-root:hover':
																		{
																			backgroundColor:
																				'#3D97F0',
																		},
																};
															}
														}
													)}
												/>
											))}
									</Box>
								</Grid>

								<Grid
									item
									xs={12}
									height="11%"
									display="flex"
									flexDirection="column"
									justifyContent="stretch"
									alignItems="stretch"
									paddingLeft={3}
									paddingRight={3}>
									<Button
										sx={{ textTransform: 'capitalize' }}
										variant="contained"
										onClick={() => updateMateria()}
										endIcon={<Save />}>
										Salvar
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
									<ModalTitle>Cadastrar Matéria</ModalTitle>
									<IconButton
										onClick={() => {
											setOpen(false);
											setSelectCategoria([]);
											setBuscaCategoria('');
										}}
										children={<Close />}
										sx={{ color: '#FF6969' }}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									height="10%"
									padding={3}
									display="flex"
									flexDirection="column"
									gap={2}>
									<TextField
										value={materiaNome}
										onChange={e =>
											setMateriaNome(e.target.value)
										}
										fullWidth
										variant="standard"
										label="Nome"
									/>
								</Grid>
								<Grid
									marginTop={4}
									item
									xs={12}
									height="60%"
									padding={3}
									display="flex"
									flexDirection="column"
									gap={2}>
									<Box
										width="100%"
										height={30}
										display="flex"
										justifyContent="space-between">
										<ModalTitle>Categoria</ModalTitle>
										<Box
											width="60%"
											height={30}
											backgroundColor="#E8EBEE"
											borderRadius={2}>
											<IconButton
												sx={{ marginTop: -0.5 }}>
												<Icon>search</Icon>
											</IconButton>
											<InputBase
												value={buscaCategoria}
												onChange={e =>
													setBuscaCategoria(
														e.target.value
													)
												}
												sx={{
													marginTop: -0.5,
													ml: 1,
													flex: 1,
												}}
												placeholder="Pesquisar..."
												inputProps={{
													'aria-label':
														'search google maps',
												}}
												fontSize="18px"
											/>
										</Box>
									</Box>

									<Box
										maxHeight="40%"
										width="100%"
										display="flex"
										gap={1}
										flexWrap="wrap"
										sx={{
											overflowX: 'auto',
											overFlowY: 'none',
										}}>
										{categorias &&
											categorias.map((row, i) => (
												<Chip
													key={i}
													label={row.categoriaNome}
													onClick={() =>
														handleClickChip({
															id: row.idCategoria,
														})
													}
													sx={selectCategoria.map(
														categoria => {
															if (
																categoria.id ==
																row.idCategoria
															) {
																return {
																	backgroundColor:
																		'#3D97F0',
																	color: '#fff',
																	'&.MuiChip-root:hover':
																		{
																			backgroundColor:
																				'#3D97F0',
																		},
																};
															}
														}
													)}
												/>
											))}
									</Box>
								</Grid>

								<Grid
									item
									xs={12}
									height="11%"
									display="flex"
									flexDirection="column"
									justifyContent="stretch"
									alignItems="stretch"
									paddingLeft={3}
									paddingRight={3}>
									<Button
										sx={{ textTransform: 'capitalize' }}
										variant="contained"
										onClick={() => createMateria()}>
										Cadastrar
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Modal>

					<Box
						width="100%"
						height={theme.spacing(7)}
						display="flex"
						justifyContent="flex-end"
						alignItems="flex-end"
						padding={2}>
						<Button
							sx={{
								fontSize: xlDown ? (lgDown ? 13 : 17) : 21,
								fontWeight: '500',
								fontFamily: 'poppins',
								textTransform: 'capitalize',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							onClick={() => setOpenCadastrarCategoria(true)}
							endIcon={<AddCircleOutline />}>
							Cadastrar Categoria
						</Button>
					</Box>
				</Box>
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
								<ModalTitle>Excluir Matéria</ModalTitle>
								<IconButton
									onClick={() => setOpeDeleteConfirm(false)}
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
									A matéria será apagado permanentemente da
									plataforma. Tem certeza de que deseja
									exclui-la?
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
									onClick={handleClickDelete}>
									Excluir
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>

				<Modal
					open={openCadastrarCategoria}
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="primary.modal"
					component={Box}>
					<Box
						width={theme.spacing(80)}
						height={theme.spacing(30)}
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
								height="4%"
								display="flex"
								alignItems="flex-start"
								justifyContent="space-between"
								padding={1}>
								<ModalTitle>Cadastrar categoria</ModalTitle>
								<IconButton
									onClick={() =>
										setOpenCadastrarCategoria(false)
									}
									children={<Close />}
									sx={{ color: '#FF6969' }}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								height="10%"
								paddingLeft={3}
								paddingRight={3}
								display="flex"
								flexDirection="column"
								gap={2}>
								<TextField
									value={categoriaNome}
									onChange={e =>
										setCategoriaNome(e.target.value)
									}
									fullWidth
									variant="standard"
									label="Nome"
								/>
							</Grid>

							<Grid
								item
								xs={12}
								height="11%"
								display="flex"
								flexDirection="column"
								justifyContent="stretch"
								alignItems="stretch"
								paddingLeft={3}
								paddingRight={3}>
								<Button
									sx={{ textTransform: 'capitalize' }}
									variant="contained"
									onClick={() => createCategoria()}>
									Cadastrar
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>
			</BaseLayout>
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
