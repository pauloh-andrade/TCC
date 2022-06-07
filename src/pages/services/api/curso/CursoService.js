import { Api } from '../axios-config';

const getAll = async () => {
	try {
		const { data } = await Api.get(`/curso/listarCurso`);
		//console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getByUser = async id => {
	try{
		const { data } = await Api.get(`http://localhost:8080/usuariocurso/listarUsuarioCurso/${id}`);
		console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	}
	catch(error){
		console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
}




const CursoService = {
	getAll,
	getByUser
};

export { CursoService };
