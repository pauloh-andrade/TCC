import colors from '../../shared/themes/Colors';
import { SvgBronze, SvgCrown, SvgOuro, SvgPlatina } from '../components/Svg';
import {
	Alert,
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	InputAdornment,
	InputLabel,
	MenuItem,
	Modal,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Tab,
	Tabs,
	TextField,
} from '@mui/material';
import {
	AccountCircle,
	AddCircle,
	AddCircleOutline,
	AddCircleOutlined,
	Bookmark,
	CommentOutlined,
	Edit,
	FavoriteBorder,
	FilterAlt,
	Image,
	InsertDriveFile,
	Leaderboard,
	Lock,
	MoreHoriz,
	Person,
	PersonOutlined,
	VideoLibrary,
} from '@mui/icons-material';
import { UserService } from '../services/api/user/UserService.js';
import { useEffect, useState, useContext } from 'react';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import Img1 from '../../../public/banner.svg';
import { LogoBlue } from '../../../public/LogoBruno';
import { AdminService } from '../dashboard/services/api/administrador/AdminService';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthUserContext } from '../../shared/contexts/AuthUserContext';
import { AlertDialog } from '../dashboard/componnents/AlertDialog';

export default function NewData() {
	const { signIn, message, setMessage } = useContext(AuthUserContext);

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { idUsuarioComum } = parseCookies();

	const handleClickAlterPassword = () => {
		if (password) {
			if (password.length > 7) {
				if (confirmPassword) {
					if (password == confirmPassword) {
						AdminService.update(
							{
								senha: password,
								primeiroAcesso: false,
							},
							idUsuarioComum
						).then(result => {
							if (result instanceof Error) {
								setMessage({
									open: true,
									severity: 'warning',
									message: 'Falha ao redefinir senha.',
								});
								return;
							} else {
								setMessage({
									open: true,
									severity: 'success',
									message: 'Senha alterada com sucesso.',
								});
								destroyCookie(null, 'primeiroAcesso', {
									path: '/',
								});
								window.location.href = '/Feed';
							}
						});
					} else {
						setMessage({
							open: true,
							severity: 'warning',
							message:
								'A confirmação de senha deve corresponder a nova senha.',
						});
					}
				} else {
					setMessage({
						open: true,
						severity: 'warning',
						message: 'Confirme sua senha.',
					});
				}
			} else {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'A senha deve conter pelo menos 8 caracteres.',
				});
			}
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha sua nova senha.',
			});
		}
	};

	return (
		<section className={styles.ContainerLogin}>
			<AlertDialog
				open={message.open}
				severity={message.severity}
				setOpen={setMessage}
				message={message.message}
			/>
			<div className={styles.BannerLogin}>
				<div>
					<LogoBlue width={164} />
				</div>
				<figure>
					<img src="http://10.107.144.26:8080/uploads/d317b06a-abcd-40ae-aa15-fc6a80df9e6f.png" />
				</figure>
			</div>
			<div className={styles.DadosLogin}>
				<div>
					<h2>Atualização de senha</h2>
					<p>
						Atualize sua senha para não perder acesso
						<br />a sua conta
					</p>
					<TextField
						required
						id="filled-required"
						label="Nova senha"
						defaultValue=""
						variant="outlined"
						type="password"
						sx={{ marginBottom: 2 }}
						fullWidth
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<TextField
						required
						id="filled-required"
						label="Confirme sua senha"
						defaultValue=""
						type="password"
						variant="outlined"
						sx={{ marginBottom: 2 }}
						fullWidth
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<div
						style={{
							width: '100%',
							textAlign: 'end',
							marginTop: 30,
						}}>
						<Button
							sx={{ width: '40%' }}
							variant="contained"
							onClick={() => handleClickAlterPassword()}>
							Redefinir
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
