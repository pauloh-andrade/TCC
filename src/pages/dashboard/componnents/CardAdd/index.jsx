import {
	Paper,
	Modal,
	Grid,
	IconButton,
	TextField,
	Button,
	Icon,
	InputBase,
	Chip,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Box, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ModalTitle } from '../Texts/ModalTitle';
import { Close } from '@mui/icons-material';
import { MateriaService } from '../../services/api/materia/MateriaService';
import { CursoService } from '../../services/api/curso/CursoService';
import { InputImage } from '../InputImage';
import { plus } from '../Icons';
import { AuthAdmContext } from '../../../../shared/contexts/AuthAdmContext';
import { AlertDialog } from '../AlertDialog';

const CardAdd = ({ findCursos }) => {
	const theme = useTheme();

	const { message, setMessage } = useContext(AuthAdmContext);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [materias, setMaterias] = useState('');
	const [idMaterias, setIdMaterias] = useState([]);

	const [cursoNome, setCursoNome] = useState('');
	const [busca, setBusca] = useState('');

	const [img, setImg] = useState(plus);

	useEffect(() => {
		findAllMaterias();
	}, [busca]);

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

	const createCurso = () => {
		if (cursoNome) {
			if (img) {
				const formData = new FormData();

				const array = [];
				idMaterias.map((row, i) => {
					array[i] = row.id;
					formData.append('materias[]', array[i]);
				});

				formData.append('cursoNome', cursoNome);
				formData.append('files', img);

				CursoService.create(formData).then(result => {
					if (result instanceof Error) {
						setMessage({
							open: true,
							severity: 'warning',
							message: 'Falha ao cadastrar o curso.',
						});
					} else {
						setMessage({
							open: true,
							severity: 'success',
							message: 'Curso cadastrado com sucesso',
						});
						setIdMaterias([]);
						setCursoNome('');
						findCursos();
					}
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
	const handleClickChip = id => {
		var add = true;
		idMaterias.length != 0 &&
			idMaterias.map((idMateria, key) => {
				if (idMateria.id == id.id) {
					const a = idMaterias;
					a.splice(key, 1);
					add = false;
					setIdMaterias([]);
					setTimeout(() => {
						setIdMaterias(a);
					}, 100);
				}
			});
		if (add) setIdMaterias([...idMaterias, id]);
	};

	return (
		<>
			<Box
				onClick={handleOpen}
				sx={{ cursor: 'pointer', border: '1px solid #c7c7c7' }}
				width="100%"
				height="100%"
				display="flex"
				backgroundColor="#e6e6e6"
				borderRadius={1}
				justifyContent="center"
				alignItems="center">
				<AlertDialog
					open={message.open}
					severity={message.severity}
					setOpen={setMessage}
					message={message.message}
				/>
				<Add
					onClick={findAllMaterias}
					sx={{
						width: '40%',
						height: '40%',
						color: '#606060',
					}}
				/>
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
							// backgroundColor="#f0f"
							display="flex"
							alignItems="flex-start"
							justifyContent="space-between"
							padding={1}>
							<ModalTitle>Cadastrar Curso</ModalTitle>
							<IconButton
								onClick={handleClose}
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
										onChange={e => setBusca(e.target.value)}
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
													materiaNome:
														row.materiaNome,
												})
											}
											sx={idMaterias.map(id => {
												if (row.idMateria == id.id) {
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
								onClick={() => createCurso()}>
								Cadastrar
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
};

export { CardAdd };
