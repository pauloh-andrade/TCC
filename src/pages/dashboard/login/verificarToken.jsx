import { useTheme } from '@emotion/react';
import {
	Button,
	capitalize,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { useState } from 'react';
import { AlertDialog } from '../componnents/AlertDialog';
import BaseLoginLayout from '../layout/BaseLoginLayout';

const dashboard = () => {
	const theme = useTheme();
	const router = useRouter();

	const [token, setToken] = useState();
	const { newPasswordToken } = parseCookies();
	const { email } = parseCookies();
	const [message, setMessage] = useState({
		open: false,
		severity: '',
		message: '',
	});

	const handleClickVerifyToken = () => {
		if (token) {
			if (newPasswordToken == token) {
				router.push('/dashboard/login/redefinicaoSenha');
				destroyCookie(null, 'newPasswordToken', { path: '/' });
			} else {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'Código inválido.',
				});
				setToken('');
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
		<BaseLoginLayout>
			<Box
				width={500}
				height={350}
				backgroundColor="primary.contrastText"
				component={Paper}
				elevation={1}
				marginTop={20}
				padding={4.5}>
				<AlertDialog
					open={message.open}
					severity={message.severity}
					setOpen={setMessage}
					message={message.message}
				/>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Typography
							fontSize={26}
							fontWeight={600}
							color="#565656">
							Codigo de autenticação
						</Typography>
						<Typography
							fontSize={18}
							fontWeight={400}
							color="#737C88">
							{email &&
								'Acabamos de enviar um código para o e-mail ' +
									email +
									'.'}
						</Typography>
					</Grid>
					<Grid item marginTop={4}>
						<TextField
							value={token}
							onChange={e => setToken(e.target.value)}
							fullWidth
							variant="standard"
							label="Codigo"
							placeholder="******"
						/>
					</Grid>

					<Grid
						item
						display="flex"
						alignItems="flex-end"
						justifyContent="flex-end"
						mt={5}>
						<Button
							onClick={() => handleClickVerifyToken()}
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
