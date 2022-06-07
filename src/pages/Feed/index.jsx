import styled from 'styled-components';
import colors from '../../shared/themes/Colors';
import {
	SvgBronze,
	SvgCrown,
	SvgOuro,
	SvgPlatina,
	imageDefault,
} from '../components/Svg';
import {
	Alert,
	Avatar,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	InputBase,
	InputLabel,
	MenuItem,
	Modal,
	Radio,
	RadioGroup,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import {
	Bookmark,
	CommentOutlined,
	Edit,
	FavoriteBorder,
	Favorite,
	FilterAlt,
	Image,
	InsertDriveFile,
	Leaderboard,
	MoreHoriz,
	VideoLibrary,
	PhotoCamera,
	Send,
	Diamond,
} from '@mui/icons-material';
import { UserService } from '../services/api/user/UserService.js';
import { CursoService } from '../services/api/curso/CursoService.js';
import { CategoriaService } from '../services/api/categoria/index.js';
import { PublicacaoService } from '../services/api/publicacao/PublicacaoService.js';
import { useEffect, useState } from 'react';
import * as React from 'react';
import styles from './index.module.css';
import { InputImageComent, InputImageFeed } from '../components/InputImage';
import { RankingService } from '../services/api/ranking/rankingService';
import { RespostaService } from '../services/api/resposta/RespostaService';
import { CardPublicacao } from '../components/CardPublicacao';
import HeaderMenu from '../components/Header';
// import stylesFeed from "./style.js"

function Feed() {
	const isTeatcher = true;

	const handleChange = event => {
		setAge(event.target.value);
	};
	const handleChangeCurtida = event => {
		console.log(event.target.checked);
		setCheckedCurtida(event.target.checked);
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [users, setUsers] = useState([]);
	const [userID, setUserId] = useState([]);
	const [cursos, setCursos] = useState([]);
	const [publicacoes, setPublicacao] = useState([]);
	const [curtidas, setCurtidas] = useState([]);
	const [publicacaoId, setPublicacaoId] = useState([]);
	const [cursoPublicacao, setCursoPublicacao] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [select, setSelect] = useState([]);
	const [checkedIcon, setCheckedIcon] = useState(true);
	const [checked, setChecked] = useState(false);
	const [descricao, setDescricao] = useState([]);
	const [tituloPost, setTituloPost] = useState([]);
	const [img, setImg] = useState();
	const [imgComent, setImgComent] = useState();

	let offset = 5;

	const postPub = () => {
		const formData = new FormData();

		formData.append('titulo', tituloPost);
		formData.append('descricao', descricao);
		formData.append('files', img);
		formData.append(
			'tblUsuariosComunIdUsuarioComum',
			userID.tblUsuarioIdUsuario
		);
		formData.append('idCurso', select);

		PublicacaoService.create(formData).then(result => {
			alert('Publicação feita com sucesso!');
			document.location.reload(true);
			// setUsers(result.usuarios);
			//console.log(result);
		});
	};

	const listLeagues = () => {
		UserService.getAll().then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setUsers(result.usuarios);
				//console.log(result.usuarios)
			}
		});
	};
	const listCursos = () => {
		CursoService.getAll().then(result => {
			if (result instanceof Error) {
				alert(result.message + 'erro curso');
				return;
			} else {
				setCursos(result.cursos);
				console.log(result.cursos);
			}
		});
	};
	const listCategorias = () => {
		CategoriaService.getAll().then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCategorias(result);
				//console.log(result);
			}
		});
	};

	// const listCurtidaPublicacao = (id) => {
	//     PublicacaoService.getLikePost(id).then(result => {
	// 		if (result instanceof Error) {
	// 			alert(result.message);
	// 			return;
	// 		} else {
	//             // console.log(result.length);
	//             result.forEach((row, i)=> {
	//                 console.log(userID.tblUsuarioIdUsuario);
	//                 if(row.tblUsuariosComunIdUsuarioComum == userID.tblUsuarioIdUsuario){
	//                     setChecked(true)
	//                 }

	//                 else{
	//                     setChecked(false)
	//                 }
	//             })
	//             // console.log(result.find((row) => {row.tblUsuariosComunIdUsuarioComum == 1}))
	//             // result.forEach((row, i)=>{console.log(row.tblUsuariosComunIdUsuarioComum);})
	//             // console.log("curtida");
	//              //console.log( result.publicacoes)
	//         }
	// 	});
	// }

	const listPublicacaoCursoId = id => {
		PublicacaoService.getByCourseId(id).then(result => {
			const publicacoesCursos = [];

			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				result.forEach((row, i) => {
					publicacoesCursos.push(row.tblPublicaco);
				});
				setPublicacao(publicacoesCursos);
				console.log(publicacoesCursos);
				console.log('cursos publicacoes');
			}
		});
	};
	const listPublicacaoCategoriaId = id => {
		PublicacaoService.getByCategoryId(id).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				console.log(result.publicacoes);
				setPublicacao(result.publicacoes);
				console.log('cursos publicacoes');
				//console.log( result.publicacoes)
			}
		});
	};
	const listUserId = id => {
		UserService.getById(id).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setUserId(result);
				console.log(result);
			}
		});
	};
	const [ranking, setRanking] = useState([]);

	const listRanking = () => {
		RankingService.getAll(3).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setRanking(result.usuarios);
				//console.log(result.usuarios)
			}
		});
	};

	useEffect(() => {
		listLeagues();
		listUserId(71);

		listCursos();
		listRanking();
		// getCurtida(2);
		// listPublicacaoId(7);
		listCategorias();
	}, []);

	const loadListPublicacoes = () => {
		PublicacaoService.getAll(offset).then(result => {
			const newPublicacoes = [];
			if (result.size < 5) {
				setPublicacao(result.publicacoes);
				console.log(result.publicacoes);
			} else {
				result.publicacoes.forEach(row => newPublicacoes.push(row));
				setPublicacao(newPublicacoes);
			}
		});
		offset += 5;
	};

	const handleScroll = e => {
		if (
			window.innerHeight + e.target.documentElement.scrollTop + 1 >
			e.target.documentElement.scrollHeight
		) {
			loadListPublicacoes();
		}
	};

	useEffect(() => {
		loadListPublicacoes();
		window.addEventListener('scroll', handleScroll);
	}, []);

	const functionChecked = () => {
		curtidas.forEach((row, i) => {
			if (
				row.tblUsuariosComunIdUsuarioComum == userID.tblUsuarioIdUsuario
			) {
				return true;
			} else {
				return false;
			}
		});
	};

	return (
		<>
			<HeaderMenu />
			<div className={styles.ContainerFeed}>
				<div>
					<div
						className="CardPost"
						style={{ minHeight: 'auto', width: '100%' }}>
						<div className="ContentProfile">
							<div
								className="CardHeader"
								style={{ height: '80px' }}></div>
							<div
								className="MyAvatar"
								style={{ height: '4rem', width: '4rem' }}>
								{userID.foto == ''
									? userID && imageDefault
									: userID && (
											<img
												src={
													'http://localhost:8080/uploads/' +
													userID.foto
												}
											/>
									  )}
							</div>
							<div className="ContainerInfo">
								<div className="InfoTexts">
									{userID != '' && (
										<h1>{userID.tblUsuario.nome}</h1>
									)}
									{userID.biografia == ''
										? userID && <p>Sem Biografia</p>
										: userID && <p>{userID.biografia}</p>}
									<p>{userID.biografia}</p>
									<div className="InfoStats">
										<p>Publicações</p>
										<span>00</span>
									</div>
									<div className="InfoStats">
										<p>Curtidas</p>
										<span>00</span>
									</div>
								</div>
							</div>
							<div className={styles.OptionsProfile}>
								<div>
									<Bookmark />
									<p>Meus itens</p>
								</div>
								<div>
									<Edit />
									<p>Editar</p>
								</div>
							</div>
						</div>
					</div>
					<div className="CardPost" style={{ width: '100%' }}>
						<div className={styles.ContentFilters}>
							<div>
								<span>
									<FilterAlt sx={{ fontSize: '2rem' }} />
									<p>Filtros</p>
								</span>
								<p>Limpar todos</p>
							</div>
							<div>
								<FormControl
									sx={{
										'.css-18wa777-MuiFormLabel-root.Mui-focused':
											{
												color: colors.text,
											},
										'.MuiFormControlLabel-label': {
											textOverflow: 'ellipsis',
											overflow: 'hidden',
											whiteSpace: 'nowrap',
											width: '80%',
											color: colors.colorIcon,
											fontFamily: 'poppins',
										},
										'.css-dmmspl-MuiFormGroup-root': {
											flexWrap: 'nowrap',
											maxHeight: 200,
											overflow: 'auto',
										},
									}}>
									<FormLabel
										id="demo-radio-buttons-group-label"
										sx={{
											fontSize: '1.2rem',
											color: colors.text,
											fontWeight: '500',
										}}>
										Cursos
									</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="female"
										name="radio-buttons-group">
										{cursos.map((row, i) => (
											<FormControlLabel
												value={row.idCurso}
												control={
													<Radio
														onChange={() =>
															listPublicacaoCursoId(
																row.idCurso
															)
														}
													/>
												}
												label={row.cursoNome}
												title={row.cursoNome}
											/>
										))}
									</RadioGroup>
								</FormControl>
							</div>
							{/* <div>
                            <FormControl sx={{
                                '.css-18wa777-MuiFormLabel-root.Mui-focused': {
                                    color: colors.text
                                },
                                '.MuiFormControlLabel-label': {
                                    textOverflow: "ellipsis", 
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    width: "80%",
                                    color: colors.colorIcon,
                                    fontFamily: "poppins"
                                }
                            }}>
                                <FormLabel id="demo-radio-buttons-group-label" sx={{fontSize: "1.2rem", color: colors.text, fontWeight: "500"}}>Categorias</FormLabel>
                                <FormGroup>
                                {categorias.map((row, i)=>{
                                    return(<FormControlLabel control={<Checkbox onChange={()=>listPublicacaoCategoriaId(row.idCategoria)}/>} label={row.categoriaNome} />
                                )})}
                                </FormGroup>
                            </FormControl>
                        </div> */}
						</div>
					</div>
				</div>
				<div>
					<div
						className="CardPost"
						style={{ minHeight: 'auto', width: '100%' }}>
						<div className={styles.CreatePost}>
							<div>
								<div
									className="MyAvatar"
									style={{ height: '3rem', width: '3rem' }}>
									{userID.foto == ''
										? userID && imageDefault
										: userID && (
												<img
													src={
														'http://localhost:8080/uploads/' +
														userID.foto
													}
												/>
										  )}
								</div>
								{userID != '' && (
									<h1>{userID.tblUsuario.nome}</h1>
								)}
							</div>
							<div className={styles.QuestionFeed}>
								<span onClick={handleOpen}>
									Que tal fazer uma pergunta hoje?
								</span>
								<Modal
									open={open}
									onClose={handleClose}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description">
									<div
										className="CardPost"
										style={{
											minHeight: '10vh',
											width: '55vw',
										}}>
										<div
											className={styles.CreatePost}
											style={{ padding: '4% 4%' }}>
											<h1
												className={
													styles.TitleCreatePubli
												}>
												Criar Pergunta
											</h1>
											<input
												className={
													styles.QuestionCreatePubli
												}
												value={tituloPost}
												onChange={e =>
													setTituloPost(
														e.target.value
													)
												}
												placeholder="Titulo da pergunta"
												type="text"
											/>
											<InputBase
												className={
													styles.DescCreatePubli
												}
												multiline
												onChange={e => {
													setDescricao(
														e.target.value
													);
												}}
												maxRows={4}
												placeholder="Digite sua pergunta aqui"
											/>
											<InputImageFeed
												img={img}
												setImg={setImg}
											/>
											<div
												className={
													styles.ContainerAnexos
												}>
												<div
													className={
														styles.BoxAnexos
													}>
													<label htmlFor="file-image">
														<span>
															<Image />
															Imagem
														</span>
													</label>
												</div>
											</div>
											<div
												className={
													styles.BoxButtonPublicar
												}>
												<FormControl
													variant="standard"
													sx={{
														m: 1,
														minWidth: 120,
													}}>
													<InputLabel id="demo-simple-select-standard-label">
														Curso
													</InputLabel>
													<Select
														labelId="demo-simple-select-standard-label"
														id="demo-simple-select-standard"
														value={select}
														onChange={e =>
															setSelect(
																e.target.value
															)
														}
														label="Curso">
														{cursos.map(
															(row, i) => (
																<MenuItem
																	value={
																		row.idCurso
																	}>
																	<em>
																		{
																			row.cursoNome
																		}
																	</em>
																</MenuItem>
															)
														)}
													</Select>
												</FormControl>
												<Button
													onClick={postPub}
													sx={{
														marginTop: 0,
														textAlign: 'end',
														fontSize: 18,
														width: '40%',
													}}
													variant="contained">
													Publicar
												</Button>
											</div>
										</div>
									</div>
								</Modal>
							</div>
							<div>
								<div className={styles.BoxAnexos}>
									<span onClick={handleOpen}>
										<Image />
										Imagem
									</span>
								</div>
							</div>
						</div>
					</div>
					{publicacoes.map((row, i) => {
						return (
							<CardPublicacao
								row={row}
								isTeatcher={isTeatcher}
								listPublicacaoCursoId={listPublicacaoCursoId}
								userID={userID.idUsuarioComum}
								idPublicacao={row.idPublicacao}
							/>
						);
					})}
				</div>
				<div>
					<div
						className="CardPost"
						style={{ minHeight: '40vh', width: '100%' }}>
						<div className={styles.RankingCardFeed}>
							<div>
								<Leaderboard />
								<h2>Ranking</h2>
							</div>
							{ranking.map((row, i) => {
								return (
									<div>
										{row && <h3>{i + 1 + 'º'}</h3>}
										<div className={styles.AvatarRanking}>
											<div
												className="MyAvatar"
												style={{
													height: '42px',
													width: '42px',
													margin: 0,
												}}>
												{row.foto == ''
													? row && imageDefault
													: row && (
															<img
																src={
																	'http://localhost:8080/uploads/' +
																	row.foto
																}
															/>
													  )}
											</div>
											{row && (
												<p>{row.tblUsuario.nome}</p>
											)}
											{row && (
												<p
													style={{
														color: '#c000ff',
														display: 'flex',
														alignItems: 'center',
													}}>
													<Diamond
														sx={{
															verticalAlign:
																'bottom',
															marginRight: 1,
														}}
													/>
													{row.pontuacao}
												</p>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div
						className="CardPost"
						style={{ minHeight: '50vh', width: '100%' }}></div>
				</div>
			</div>
		</>
	);
}

export default Feed;
