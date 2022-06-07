import { useTheme } from '@emotion/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	capitalize,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import BaseLoginLayout from '../layout/BaseLoginLayout';

import { AuthAdmContext } from '../../../shared/contexts/AuthAdmContext';
import { destroyCookie, parseCookies } from 'nookies';
import { AdminService } from '../services/api/administrador/AdminService';

const dashboard = () => {
	const theme = useTheme();
	const { user } = useContext(AuthAdmContext);
	console.log(user);

	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleClickAlterPassword = () => {
		const { idUsuario } = parseCookies();
		if (password == confirmPassword) {
			AdminService.update(
				{
					senha: password,
					primeiroAcesso: false,
				},
				idUsuario
			).then(result => {
				if (result instanceof Error) {
					alert(result.message);
					return;
				}
			});
			destroyCookie(null, 'primeiroAcesso', { path: '/' });
			window.location.href = '/dashboard/usuarios';
		}
	};

	return (
		<BaseLoginLayout>
			<Box
				width={500}
				height={380}
				backgroundColor="primary.contrastText"
				component={Paper}
				elevation={1}
				marginTop={20}
				padding={5}>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Typography
							fontSize={26}
							fontWeight={600}
							color="#565656">
							Entrar
						</Typography>
						<Typography
							fontSize={18}
							fontWeight={400}
							color="#737C88">
							Proteja seu login e atualize sua senha.
						</Typography>
					</Grid>
					<Grid item>
						<TextField
							value={password}
							onChange={e => setPassword(e.target.value)}
							fullWidth
							variant="standard"
							label="Nova senha "
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											marginRight={5}
											onClick={() =>
												showPassword
													? setShowPassword(false)
													: setShowPassword(true)
											}>
											{showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item display="flex" flexDirection="column">
						<TextField
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							fullWidth
							variant="standard"
							label="Confirme sua senha"
							type={showPassword2 ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											marginRight={5}
											onClick={() =>
												showPassword2
													? setShowPassword2(false)
													: setShowPassword2(true)
											}>
											{showPassword2 ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid
						item
						display="flex"
						alignItems="flex-end"
						justifyContent="flex-end"
						mt={5}>
						<Button
							onClick={() => handleClickAlterPassword()}
							variant="contained"
							size="small"
							sx={{ textTransform: 'capitalize', width: 100 }}>
							Entrar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</BaseLoginLayout>
	);
};

export default dashboard;
