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
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { AlertDialog } from '../dashboard/componnents/AlertDialog';
import {
	AuthContext,
	AuthUserContext,
} from '../../shared/contexts/AuthUserContext';

export default function ResetPassword() {
	const { signIn, message, setMessage } = useContext(AuthUserContext);

	const router = useRouter();
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
							}
						});
						// destroyCookie(null, 'primeiroAcesso');
						router.push('/');
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
					<img src="http://localhost:8080/uploads/d317b06a-abcd-40ae-aa15-fc6a80df9e6f.png" />
				</figure>
			</div>
			<div className={styles.DadosLogin}>
				<div>
					<h2 style={{ marginBottom: '3.8rem' }}>
						Redefinição de senha
					</h2>
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
							marginTop: 50,
						}}>
						<Button
							sx={{ width: '40%' }}
							variant="contained"
							onClick={() => handleClickAlterPassword()}>
							Seguinte
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
