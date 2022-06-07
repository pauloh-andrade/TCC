import {
	CommentOutlined,
	Favorite,
	FavoriteBorder,
	MoreHoriz,
	PhotoCamera,
	Send,
} from '@mui/icons-material';
import {
	Avatar,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputBase,
	Radio,
	RadioGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import colors from '../../../shared/themes/Colors';
import { PublicacaoService } from '../../services/api/publicacao/PublicacaoService';
import { RespostaService } from '../../services/api/resposta/RespostaService';
import { InputImageComent } from '../InputImage';

export function CardPublicacao({
	row,
	isTeatcher,
	listPublicacaoCursoId,
	userID,
	idPublicacao,
}) {
	const [imgComent, setImgComent] = useState();
	const [checked, setChecked] = useState(false);
	const [curtida, setCurtida] = useState('');
	const [comentario, setComentario] = useState();

	const comentarioPub = () => {
		const formData = new FormData();
		var todayDate = new Date().toISOString().slice(0, 10);

		formData.append('descricaoResposta', comentario);
		formData.append('dataHoraResposta', todayDate);
		formData.append('idUsuarioComum', userID);
		formData.append('idPublicacao', idPublicacao);
		formData.append('files', imgComent);

		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}

		PublicacaoService.createComent(formData).then(result => {
			alert('comentário feito com sucesso!');
		});
	};

	const insertLike = idPublicacao => {
		setChecked(true);
		var todayDate = new Date().toISOString().slice(0, 10);
		PublicacaoService.createLike({
			dataHora: todayDate,
			tblUsuariosComunIdUsuarioComum: userID,
			tblPublicacoIdPublicacao: idPublicacao,
		}).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				alert('curtida feita com sucesso!');
				// setUsers(result.usuarios);
				//console.log(result);
			}
		});
	};

	const removeLike = idPublicacao => {
		PublicacaoService.deleteLike(idPublicacao, userID).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				alert('curtida excluída com sucesso!');
				// setUsers(result.usuarios);
				//console.log(result);
			}
		});
	};
	const [respostas, setRespostas] = useState([]);

	const listComents = () => {
		RespostaService.getById(idPublicacao).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setRespostas(result);
				console.log(result);
			}
		});
	};

	const CurtidaTotal = () => {
		PublicacaoService.getLikePost(idPublicacao).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				console.log('teste', result.length);
				setCurtida(result.length);
			}
		});
	};

	useEffect(() => {
		listComents(), CurtidaTotal();
	}, []);

	return (
		<div className="CardPost" style={{ minHeight: '15vh', width: '100%' }}>
			<div className="PostCard" style={{ padding: '3% 5%' }}>
				<div className="PostPrimary">
					<div>
						<Avatar
							sx={{ height: 54, width: 54 }}
							src={
								'http://10.107.144.27:8080/uploads/' +
								row.tblUsuariosComun.foto
							}
						/>
						<div>
							{row.tblUsuariosComun.tblUsuario != null && (
								<h2>{row.tblUsuariosComun.tblUsuario.nome}</h2>
							)}
							<span>Agora mesmo</span>
						</div>
					</div>
					<div>
						{isTeatcher ? (
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Verificar Resposta
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									defaultValue="female"
									row
									name="radio-buttons-group">
									<FormControlLabel
										value={1}
										control={
											<Radio
												sx={{
													color: 'success',
													'&.Mui-checked': {
														color: colors.text,
													},
												}}
												onChange={() =>
													listPublicacaoCursoId(
														row.idCurso
													)
												}
											/>
										}
										label="Sim"
										title="Sim"
									/>
									<FormControlLabel
										value={0}
										control={
											<Radio
												onChange={() =>
													listPublicacaoCursoId(
														row.idCurso
													)
												}
											/>
										}
										label="Não"
										title="Não"
									/>
								</RadioGroup>
							</FormControl>
						) : (
							''
						)}
						<MoreHoriz
							sx={{ fontSize: 28, color: colors.colorIcon }}
						/>
					</div>
				</div>
				<div className="PostMain">
					{row && <h2>{row.titulo}</h2>}
					{row && <p>{row.descricao}</p>}
					{row && (
						<img
							style={{
								display: row.imagemUm == '' ? 'none' : 'block',
							}}
							src={
								'http://10.107.144.27:8080/uploads/' +
								row.imagemUm
							}
						/>
					)}
					<div>
						<div>
							{/* {curtidas && (<p>{curtidas.length}</p>)} */}

							<FormControlLabel
								control={
									<Checkbox
										onChange={e => {
											e.target.checked
												? insertLike(row.idPublicacao)
												: removeLike(row.idPublicacao);
										}}
										icon={<FavoriteBorder />}
										checkedIcon={<Favorite />}
										sx={{ color: colors.primary }}
										inputProps={{
											'aria-label': 'controlled',
										}}
									/>
								}
								label={curtida}
								labelPlacement="end"
							/>
						</div>
						<div>
							<CommentOutlined sx={{ color: colors.primary }} />
							comentários
						</div>
					</div>
					<div
						style={{
							gap: 0,
							gridGap: 0,
							display: 'block',
							borderTop: 'solid 1px #c5c5c5',
							paddingTop: '0.7rem',
						}}>
						<div
							style={{
								backgroundColor: '#e1e1e1',
								width: '100%',
								borderRadius: '1.5rem',
								padding: '0.2rem 1rem',
								marginBottom: '1rem',
							}}>
							<InputBase
								multiline
								onChange={e => {
									setComentario(e.target.value);
								}}
								sx={{
									width: '100%',
									alignItems: 'flex-start',
									'.css-sur1aw-MuiInputBase-root-MuiInput-root':
										{
											width: '100%',
										},
								}}
								maxRows={4}
								placeholder="Escreva um comentário"
							/>
							<label
								style={{
									display: 'flex',
									alignItems: 'flex-end',
									color: '#818181',
								}}
								htmlFor="file-imageComent">
								<PhotoCamera />
							</label>
							<label
								onClick={() => {
									comentarioPub(row.idPublicacao);
								}}
								style={{
									display: 'flex',
									alignItems: 'flex-end',
									color: '#818181',
								}}>
								<Send />
							</label>
						</div>
						<div style={{ width: '18vw', padding: '0 1rem' }}>
							<InputImageComent
								imgComent={imgComent}
								setImgComent={setImgComent}
							/>
						</div>
					</div>
					{respostas.map((linha, index) => {
						return (
							<div
								style={{ marginBottom: 20 }}
								className="PostPrimary">
								<div>
									<Avatar
										sx={{ height: 42, width: 42 }}
										src={
											'http://10.107.144.27:8080/uploads/' +
											row.tblUsuariosComun.foto
										}
									/>
									<div>
										<h3
											style={{
												color: colors.text,
												fontWeight: '500',
											}}>
											Bruno
										</h3>
										<p
											style={{
												color: colors.text,
												fontWeight: '400',
											}}>
											meu comentario
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
