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
import {
	AuthContext,
	AuthUserContext,
} from '../../shared/contexts/AuthUserContext';
import { AlertDialog } from '../dashboard/componnents/AlertDialog';

export default function Login() {
	const { signIn, message, setMessage } = useContext(AuthUserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = async data => {
		if (email && password) {
			const result = await signIn({ email: email, senha: password });
			setEmail('');
			setPassword('');
		} else {
			setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha todos os campos.',
			});
		}
	};

	const handleClickFeed = () => {
		window.location.href = '../Feed';
	};
	const handleClickForgotPassword = () => {
		window.location.href = '/Login/ForgotPassword';
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
					<img src="http://10.107.144.27:8080/uploads/d317b06a-abcd-40ae-aa15-fc6a80df9e6f.png" />
				</figure>
			</div>
			<div className={styles.DadosLogin}>
				<div>
					<h2>Login</h2>
					<p>
						Faça login e começe a descobrir
						<br />
						novos conhecimentos!
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
					<TextField
						required
						id="filled-required"
						label="Password"
						defaultValue=""
						variant="outlined"
						sx={{ marginBottom: 4 }}
						fullWidth
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<a
						onClick={() => handleClickForgotPassword()}
						className={styles.forgotPassword}>
						Esqueceu a senha?
					</a>
					<div
						style={{
							width: '100%',
							textAlign: 'end',
							marginTop: 50,
						}}>
						<Button
							onClick={() => handleSignIn()}
							sx={{ width: '40%' }}
							variant="contained">
							{' '}
							Entrar
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
