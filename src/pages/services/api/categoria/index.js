import { Api } from '../axios-config';

const getAll = async () => {
	try {
		const { data } = await Api.get(`/categoria/listarCategoria`);
		//console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getById = async (id) => {
	try {
		const { data } = await Api.get(`/categoria/listarCategoria/${id}`);
		//console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};





const CategoriaService = {
	getAll, 
	getById
};

export { CategoriaService };
