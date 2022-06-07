import axios from 'axios';
import { useEffect } from 'react';
import { Api } from '../axios-config';

const getAll = async (offset) => {

	// useEffect(() => {
	// 	axios({
	// 		method: 'GET',
	// 		url: 'http://localhost:3000/publicacao/listarPublicacao',
	// 		params: { page: pageNumber}
	// 	}).then(res => {

	// 	})
	// }, [pageNumber])


	try {
		const { data } = await Api.get(`/publicacao/listarPublicacao?limit=${offset}`)
		//console.log(data);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getById = async id => {
	try {
		const { data } = await Api.get(`/publicacao/listarPublicacao/${id}`);
		// console.log(data); 
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getByCourseId = async id => {
	try {
		const { data } = await Api.get(`/publicacaocurso/listarPublicacaoCurso/${id}`);
		// console.log(data); 
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const getByCategoryId = async id => {
	try {
		const { data } = await Api.get(`/publicacao/listarPublicacao?categoria=${id}`);
		// console.log(data); 
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};


const getLikePost = async id => {
	try {
		const { data } = await Api.get(`/curtidapublicacao/listarCurtidaPublicacao/${id}`);
		//console.log(data.length); 
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const create = async datas => {
	try {
		const { data } = await Api.post(`/publicacao/inserirPublicacao`, datas);
		if (data) return data.id;
		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const createLike = async datas => {
	try {
		const { data } = await Api.post(`/curtidapublicacao/inserirCurtidaPublicacao`, datas);
		if (data) return data.id;
		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};
const createComent = async datas => {
	try {
		console.log(datas)
		const { data } = await Api.post(`/resposta/inserirResposta`, datas);
		if (data) return data.id;
		return new Error('Erro ao criar o registro');
	} catch (error) {
		console.log(error);
		return new Error(error.message || 'Erro ao criar o registro');
	}
};

const deleteLike = async (idPublicacao, idUsuario) => {
	try {
		await Api.delete(`/curtidapublicacao/excluirCurtidaPublicacao?${
			idPublicacao && 'idPublicacao=' + idPublicacao + '&'
		}${idUsuario && 'idUsuarioComum=' + idUsuario + '&'}`);
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao deletar o registro');
	}
};


const PublicacaoService = {
	getAll,
    getById,
	getByCourseId,
	getByCategoryId,
	getLikePost,
	create, 
	createLike,
	createComent,
	deleteLike,
};

export { PublicacaoService };
