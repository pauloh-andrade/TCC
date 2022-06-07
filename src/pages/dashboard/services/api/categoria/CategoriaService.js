import { Api } from '../axios-config';

const getAll = async (busca) => {
	try {
		const { data } = await Api.get(`/categoria/listarCategoria?${
			busca && 'busca=' + busca + '&'}`);
		if (data) return data;
		console.log(data);
		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};
const getCategoriaByIdMateria = async (id) => {
	try {
		const { data } = await Api.get(`/materia/listarMateria/${id}`);
		if (data) return data;
		
		console.log(data);
		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

// const getById = async id => {
// 	try {
// 		const { data } = await Api.get(`/usuario/listarUsuarioComum/${id}`);
// 		// console.log(data);
// 		if (data) return data;

// 		return new Error('Erro ao listar os registros');
// 	} catch (error) {
// 		console.log(error);
// 		return new Error(error.message || 'Erro ao listar os registros');
// 	}
// };

// const deleteById = async id => {
// 	try {
// 		await Api.delete(`/usuario/excluirUsuarioComum/${id}`);
// 	} catch (error) {
// 		console.log(error);
// 		return new Error(error.message || 'Erro ao deletar o registro');
// 	}
// };

const remove = async (idMateria, idCategoria) => {
	try {
		const result = await Api.delete(`/materiacategoria/excluirMateriaCategoria?idMateria=${idMateria}&idCategoria=${idCategoria}`);
		return result;
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao deletar o registro');
	}
};

const create = async datas => {
	try {
		const { data } = await Api.post(`/categoria/inserirCategoria`, datas);
		if (data) return data.id;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

// const update = async (datas, id) => {
// 	try {
// 		const { data } = await Api.put(
// 			`/usuario/alterarUsuarioComum/${id}`,
// 			datas
// 		);
// 		if (data) return data.id;

// 		return new Error('Erro ao atualizar o registro');
// 	} catch (error) {
// 		console.log(error);
// 		return new Error(error.message || 'Erro ao atualizar o registro');
// 	}
// };

const CategoriaService = {
	getAll,
	getCategoriaByIdMateria,
	// getById,
	// deleteById,
	create,
	// update,
	remove,
};

export { CategoriaService };
