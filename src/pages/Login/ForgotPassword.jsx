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
import { LoginService } from '../dashboard/services/api/loginComum/LoginComumService';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { AlertDialog } from '../dashboard/componnents/AlertDialog';
import {
	AuthContext,
	AuthUserContext,
} from '../../shared/contexts/AuthUserContext';

export default function ForgotPassword() {
	const { signIn, message, setMessage } = useContext(AuthUserContext);
	const [email, setEmail] = useState('');
	const router = useRouter();

	const handleClickSendEmail = () => {
		if (email) {
			LoginService.sendEmail({
				email,
			}).then(result => {
				if (result instanceof Error) {
					setMessage({
						open: true,
						severity: 'warning',
						message: 'E-mail inválido, preencha novamente.',
					});
					setEmail('');
					return;
				} else if (result.token) {
					console.log(result);
					setCookie(null, 'newPasswordToken', result.token, {
						maxAge: 60 * 60 * 1, // 1 hour
					});
					setCookie(null, 'idUsuarioComum', result.idUsuario, {
						maxAge: 60 * 60 * 1, // 1 hour
					});
					setCookie(null, 'email', result.email, {
						maxAge: 60 * 60 * 1, // 1 hour
					});
					router.push('/Login/AuthenticationCode');
				}
			});
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha seu email.',
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
					<h2>Esqueceu a senha?</h2>
					<p style={{ marginBottom: 18 }}>
						Digite o email cadastrado na plataforma
					</p>
					<TextField
						required
						id="filled-required"
						label="Email"
						defaultValue=""
						variant="outlined"
						sx={{ marginBottom: 2 }}
						fullWidth
						value={email}
						onChange={e => setEmail(e.target.value)}
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
							onClick={() => handleClickSendEmail()}>
							Seguinte
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
