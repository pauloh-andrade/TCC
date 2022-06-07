import { ArrowBack, Close, Delete, Edit, Save } from '@mui/icons-material';
import {
	Box,
	Button,
	Chip,
	Grid,
	Icon,
	IconButton,
	InputBase,
	Modal,
	Paper,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthAdmContext } from '../../../../shared/contexts/AuthAdmContext';
import { CursoService } from '../../services/api/curso/CursoService';
import { MateriaService } from '../../services/api/materia/MateriaService';
import { AlertDialog } from '../AlertDialog';
import { InputImage } from '../InputImage';
import { ModalTitle } from '../Texts/ModalTitle';

const CardCurso = ({ id, nome, foto, getCursos }) => {
	const theme = useTheme();
	const router = useRouter();

	const { message, setMessage } = useContext(AuthAdmContext);

	const lgDown = useMediaQuery(theme.breakpoints.down(1400));
	const exUp = useMediaQuery(theme.breakpoints.up(1900));

	const [open, setOpen] = useState(false);
	const [cursoNome, setCursoNome] = useState('');
	const [busca, setBusca] = useState('');
	const [materias, setMaterias] = useState();
	const [curso, setCurso] = useState();
	const [cursoMaterias, setCursoMaterias] = useState([]);

	const [img, setImg] = useState();

	const handleClickEdit = id => {
		setCursoById(id);
		setAllMaterias();
		setOpen(true);
	};

	const handleClickSalvar = () => {
		if (cursoNome) {
			if (img) {
				const formData = new FormData();

				const array = [];
				cursoMaterias.map((row, i) => {
					array[i] = row;
					formData.append('materias[]', array[i]);
				});

				formData.append('cursoNome', cursoNome);
				formData.append('files', img);

				CursoService.update(formData, curso.idCurso).then(result => {
					console.log(result);
					if (result instanceof Error) {
						setMessage({
							open: true,
							severity: 'warning',
							message: 'Falha ao atualizar o curso.',
						});
					} else {
						setMessage({
							open: true,
							severity: 'success',
							message: 'Curso atualizado com sucesso',
						});
						getCursos();
						setOpen(false);
					}

					// setIdMaterias([]);
					// setCursoNome('');
					// findCursos();
				});
			} else {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Selecione uma imagem.',
				});
			}
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha o nome do curso.',
			});
		}
	};

	const handleDelete = () => {
		CursoService.deleteById(id).then(result => {
			if (result instanceof Error) {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Falha ao deletar curso.',
				});
			} else {
				setMessage({
					open: true,
					severity: 'success',
					message: 'Curso deletado com sucesso.',
				});
				getCursos();
			}
		});
	};

	const setAllMaterias = () => {
		MateriaService.getAll(busca).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setMaterias(result);
			}
		});
	};
	const setCursoById = id => {
		CursoService.getById(id).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCurso(result);
				setImg(
					'http://10.107.144.27:8080/uploads/' + result.cursoImagem
				);
				setCursoNome(result.cursoNome);

				let array = [];
				result.tblCursosMaterias.map((row, i) => {
					if (i == 0) {
						array = [...cursoMaterias];
					}
					array = [...array, row.tblMateriaIdMateria];
					setCursoMaterias(array);
				});
			}
		});
	};

	const handleClickChip = id => {
		var add = true;
		cursoMaterias.length > 0 &&
			cursoMaterias.map((idMateria, key) => {
				if (idMateria == id.id) {
					let array = cursoMaterias;
					array.splice(key, 1);
					add = false;
					setCursoMaterias([]);
					setTimeout(() => {
						setCursoMaterias(array);
					});
				}
			});
		if (add) setCursoMaterias([...cursoMaterias, id.id]);

		console.log('cursoMaterias:' + cursoMaterias);
	};
	useEffect(() => {
		setAllMaterias();
	}, [busca]);

	return (
		<>
			<Box
				width="100%"
				height="100%"
				borderRadius={1}
				backgroundColor="#ffffff"
				component={Paper}
				elevation={3}
				overflow="hidden"
				position="relative">
				<AlertDialog
					open={message.open}
					severity={message.severity}
					setOpen={setMessage}
					message={message.message}
				/>
				<Box
					component="img"
					sx={{
						objectFit: 'cover',
					}}
					width="100%"
					height="70%"
					src={'http://10.107.144.27:8080/uploads/' + foto}></Box>

				<Box width="100%" height="30%" padding={1}>
					<Typography
						fontSize={15}
						fontWeight="500"
						fontFamily="poppins"
						color="primary.fontMain"
						marginLeft={1}>
						{nome}
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					opacity: 0,
					'&:hover': {
						opacity: 1,
						backgroundColor: '#f4f4f470',
						filter: blur('100px'),
					},
				}}
				width="100%"
				height="100%"
				borderRadius={1}
				position="relative"
				marginTop={lgDown ? -28 : exUp ? -41 : -33}
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap={1}>
				<Button
					variant="contained"
					width={130}
					height={40}
					backgroundColor="primary.main"
					display="flex"
					alignItems="center"
					borderRadius={0}
					sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
					onClick={() => handleClickEdit(id)}>
					<Edit sx={{ color: '#fff' }} />
					<Typography
						fontSize={15}
						fontWeight="500"
						fontFamily="poppins"
						color="primary.contrastText"
						marginLeft={1}>
						Editar
					</Typography>
				</Button>
				<Box
					width={38}
					height={38}
					// backgroundColor="primary.main"
					display="flex"
					alignItems="center"
					justifyContent="center"
					padding={0.6}
					borderRadius={0.6}
					border="2px solid #3D97F0"
					sx={{
						cursor: 'pointer',
						'&:hover': {
							backgroundColor: '#3D97F0',
						},
					}}
					onClick={() => handleDelete(id)}>
					<Delete
						sx={{ color: '#3D97F0', '&:hover': { color: '#fff' } }}
					/>
				</Box>
			</Box>
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
							height="4%"
							display="flex"
							alignItems="flex-start"
							justifyContent="space-between"
							padding={1}>
							<ModalTitle>Editar Curso</ModalTitle>
							<IconButton
								onClick={() => setOpen(false)}
								children={<Close />}
								sx={{ color: '#FF6969' }}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							paddingLeft={3}
							paddingRight={3}
							// backgroundColor="#f0f"
							display="flex"
							alignItems="flex-end"
							gap={2}>
							<TextField
								value={cursoNome}
								onChange={e => setCursoNome(e.target.value)}
								fullWidth
								variant="standard"
								label="Nome"
								size="large"
							/>
							<InputImage img={img} setImg={setImg} />
						</Grid>
						<Grid
							item
							xs={12}
							paddingLeft={3}
							paddingRight={3}
							paddingTop={2}
							display="flex"
							flexDirection="column"
							gap={2}>
							<Box
								width="100%"
								height={30}
								display="flex"
								justifyContent="space-between">
								<ModalTitle>Matérias</ModalTitle>
								<Box
									width="60%"
									height={30}
									backgroundColor="#E8EBEE"
									borderRadius={2}>
									<IconButton sx={{ marginTop: -0.5 }}>
										<Icon>search</Icon>
									</IconButton>
									<InputBase
										value={busca}
										onChange={e => {
											setBusca(e.target.value);
											console.log(busca);
										}}
										sx={{ marginTop: -0.5, ml: 1, flex: 1 }}
										placeholder="Pesquisar..."
										inputProps={{
											'aria-label': 'search google maps',
										}}
										fontSize="18px"
									/>
								</Box>
							</Box>

							<Box
								minHeight={80}
								maxHeight={110}
								width="100%"
								display="flex"
								gap={1}
								flexWrap="wrap"
								sx={{ overflowX: 'auto', overFlowY: 'none' }}>
								{materias &&
									materias.map((row, i) => (
										<Chip
											key={i}
											label={row.materiaNome}
											onClick={() =>
												handleClickChip({
													id: row.idMateria,
												})
											}
											sx={cursoMaterias.map(materia => {
												if (materia == row.idMateria) {
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
											})}
										/>
									))}
							</Box>
							<Box
								maxHeight="50%"
								width="100%"
								display="flex"
								gap={1}
								flexWrap="wrap"
								overflow="scroll"></Box>
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
								onClick={() => handleClickSalvar()}
								endIcon={<Save />}>
								Salvar
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
};

export { CardCurso };
