import axios from 'axios';
import { useEffect } from 'react';
import { Api } from '../axios-config';

const getById = async id => {
	try {
		console.log(id); 
		const { data } = await Api.get(`/resposta/listarResposta/${id}`);
		if (data) return data;

		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};




const RespostaService = {
    getById,
};

export { RespostaService };