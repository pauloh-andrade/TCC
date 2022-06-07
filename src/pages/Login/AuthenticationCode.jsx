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
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { AlertDialog } from '../dashboard/componnents/AlertDialog';
import { AuthContext, AuthUserContext } from '../../shared/contexts/AuthUserContext';

export default function AuthenticationCode() {
	const router = useRouter();
	const { signIn, message, setMessage } = useContext(AuthUserContext);
	const [authCode, setAuthCode] = useState('');
	const { newPasswordToken } = parseCookies();
	const { email } = parseCookies();

	const handleClickVerifyToken = () => {
		if (authCode) {
			if (newPasswordToken == authCode) {
				router.push('/Login/ResetPassword');
				destroyCookie(null, 'newPasswordToken', { path: '/' });
			} else {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Código inválido.',
				});
				setAuthCode('');
			}
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha o código de autenticação.',
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
					<h2>Código de autenticação</h2>
					<p style={{ marginBottom: 18 }}>
						Acabamos de enviar um código para seu
						<br /> e-mail junior123@gmail.com.
					</p>
					<TextField
						required
						id="filled-required"
						label="Código"
						defaultValue=""
						type="text"
						variant="outlined"
						sx={{ marginBottom: 2 }}
						fullWidth
						value={authCode}
						onChange={e => setAuthCode(e.target.value)}
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
							onClick={() => handleClickVerifyToken()}>
							Seguinte
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
