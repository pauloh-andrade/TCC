import { Api } from '../axios-config';

const getAll = async (
	page,
	limit,
	filterTipo,
	filterStatus,
	filterModerador,
	order,
	busca
) => {
	try {
		const { data } = await Api.get(
			`/usuario/listarUsuarioComum?${
				filterTipo && 'classificacao=' + filterTipo + '&'
			}${filterStatus && 'status=' + filterStatus + '&'}${
				filterModerador && '&moderador=' + filterModerador + '&	'
			}${order && 'ordenar=' + order + '&'}${
				busca && 'busca=' + busca + '&'
			}${page && 'page=' + page + '&'}${limit && 'limit=' + limit + '&'}`
		);
		console.log(
			`/usuario/listarUsuarioComum?${
				filterTipo && 'classificacao=' + filterTipo + '&'
			}${filterStatus && 'status=' + filterStatus + '&'}${
				filterModerador && 'moderador=' + filterModerador + '&	'
			}${order && 'ordenar=' + order + '&'}`
		);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getById = async id => {
	try {
		const { data } = await Api.get(`/usuario/listarUsuarioComum/${id}`);
		// console.log(data);
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
		console.log(error);
		return new Error(error.message || 'Erro ao deletar o registro');
	}
};

const create = async datas => {
	try {
		const { data } = await Api.post(`/usuario/inserirUsuarioComum`, datas);
		if (data) return data.id;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
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
	getById,
	deleteById,
	create,
	update,
	removeImage
};

export { UserService };
