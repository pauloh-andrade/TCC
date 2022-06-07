import { Api } from '../axios-config';

const login = async datas => {
	try {
		const { data } = await Api.post(`/loginAdm`, datas);
		if (data) return data;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const sendEmail = async datas => {
	try {
		const { data } = await Api.post(`/esqueceuSenha`, datas);
		if (data) return data;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const LoginService = {
	login,
	sendEmail
};

export { LoginService };
