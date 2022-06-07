import { createContext, useState } from 'react';
import { setCookie } from 'nookies';
import Router, { useRouter } from 'next/router';
import { LoginService } from '../../pages/dashboard/services/api/loginComum/LoginComumService';

const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
	const [user, setUser] = useState();
	const isAuthenticated = !!user;

	const [message, setMessage] = useState({
		open: false,
		severity: '',
		message: '',
	});

	const signIn = ({ email, senha }) => {
		LoginService.login({
			email,
			senha,
		}).then(result => {
			if (result instanceof Error) {
				setMessage({
					open: true,
					severity: 'warning',
					message: 'E-mail ou senha inválidos',
				});
			} else {
				setCookie(null, 'teclearnUser.token', result.token, {
					maxAge: 60 * 60 * 1, // 1 hour
					path: '/',
				});
				setCookie(
					null,
					'primeiroAcessoUsuario',
					result.usuario.primeiroAcesso,
					{
						maxAge: 60 * 60 * 1, // 1 hour
						path: '/',
					}
				);
				setCookie(null, 'idUsuarioComum', result.usuario.idUsuario, {
					maxAge: 60 * 60 * 1, // 1 hour
					path: '/',
				});
				setCookie(null, 'classificacao', result.usuario.classificacao, {
					maxAge: 60 * 60 * 1, // 1 hour
					path: '/',
				});

				if (result.usuario.primeiroAcesso) {
					window.location.href = '/Login/NewData';
					console.log(user);
					console.log(result);
				} else {
					window.location.href = '/Feed/';
				}
			}
		});
	};

	return (
		<AuthUserContext.Provider
			value={{ user, isAuthenticated, signIn, message, setMessage }}>
			{children}
		</AuthUserContext.Provider>
	);
};

export { AuthUserContext, AuthUserProvider };
