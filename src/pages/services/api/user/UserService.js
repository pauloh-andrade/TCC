import { Api } from '../axios-config';

const getAllUser = async () => {
	try {
		const { data } = await Api.get(`/usuario/listarUsuario`);
		//console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};


const getAll = async () => {
	try {
		const { data } = await Api.get(`/usuario/listarUsuarioComum`);
		//console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};
const deleteById = async id => {
	try {
		await Api.delete(`/usuario/excluirUsuarioComum/${id}`);
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao deletar o registro');
	}
};

const getById = async id => {
	try {
		const { data } = await Api.get(`/usuario/listarUsuarioComum/${id}`);
		 console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao buscar o registro');
	}
};

const create = async datas => {
	try {
		const { data } = await Api.post(`/usuario/inserirUsuarioComum`, datas);
		if (data) return data.id;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const update = async (datas, id) => {
	try {
		const { data } = await Api.put(
			`/usuario/alterarUsuarioComum/${id}`,
			datas
		);
		if (data) return data.id;

		return new Error('Erro ao atualizar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao atualizar o registro');
	}
};

const removeImage = async (id) => {
	try {
		const { data } = await Api.put(
			`/usuario/removeImage/${id}`,
		);
		if (data) return data.id;

		return new Error('Erro ao atualizar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao atualizar o registro');
	}
};


const UserService = {
	getAll,
	getAllUser,
	deleteById,
	create,
	getById, 
	update,
	removeImage
};

export { UserService };
