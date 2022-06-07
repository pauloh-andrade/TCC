import { Api } from '../axios-config';

const getAll = async (page) => {
	try {
		const { data } = await Api.get(
			`/curso/listarCurso?page=${page}`
		);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getById = async id => {
	console.log(id);
	try {
		const { data } = await Api.get(`/curso/listarCurso/${id}`);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const deleteById = async id => {
	try {
		await Api.delete(`/curso/excluirCurso/${id}`);
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao deletar o registro');
	}
};

const create = async datas => {
	console.log(datas);
	console.log("dsdasdas");
	try {
		const { data } = await Api.post(`/curso/inserirCurso`,datas, {
			headers: {
			"Content-Type": `multipart/form-data;`,
			}
		  });
		if (data) return data.id;

		return new Error('Erro ao criar o registro');	
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const createMateriaCurso = async datas =>{
	try {
		const { data } = await Api.post(`/cursomateria/inserirCursoMateria`, datas);
		if (data) return data.id;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
}

const update = async (datas, id) => {
	try {
		const { data } = await Api.put(`/curso/alterarCurso/${id}`,datas, {
			headers: {
			"Content-Type": `multipart/form-data;`,
			}
		  });
		if (data) return data.id;

		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const CursoService = {
	getAll,
	getById,
	createMateriaCurso,
	deleteById,
	create,
	update,
};

export {CursoService};
