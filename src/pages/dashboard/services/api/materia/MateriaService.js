import { Api } from '../axios-config';

const getAll = async (busca) => {
	try {
		const { data } = await Api.get(`/materia/listarMateria?${
			busca && 'busca=' + busca + '&'}`);
		if (data) return data;
	// 	console.log(`/materia/listarMateria/${busca && 'busca=' + busca}`);
		console.log(data);
		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	};
};

const getById = async id => {
	try {
		const { data } = await Api.get(`/materia/listarMateria/${id}`);
		// console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getDifMateria = async (materias) => {
	try {
		const { data } = await Api.post(`/curso/listarCursoMateriaRelacionado`, { materias: materias });
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
		await Api.delete(`/materia/excluirMateria/${id}`);
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao deletar o registro');
	}
};

const create = async datas => {
	try {
		const { data } = await Api.post(`/materia/inserirMateria`, datas);
		console.log(data);
		if (data) return data;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const createMateriaCategoria = async datas => {
	try {
		const { data } = await Api.post(`/materiacategoria/inserirMateriaCategoria`, datas);
		console.log(data);
		if (data) return data;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const update = async (datas, id) => {
	try {
		console.log(id);
		const { data } = await Api.put(
			`/materiacategoria/alterarMateriaCategoria/${id}`,
			datas
		);
		if (data) return data.id;

		return new Error('Erro ao atualizar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao atualizar o registro');
	}
};

const MateriaService = {
	getAll,
	getDifMateria,
	getById,
	deleteById,
	create,
	createMateriaCategoria,
	update,
};

export { MateriaService };
