import axios from 'axios';
import { useEffect } from 'react';
import { Api } from '../axios-config';

const getAll = async (number) => {
	try {
		const { data } = await Api.get(`/usuario/listarUsuarioComum?ordenar=Maior pontuação&limit=${number}`)
		if (data) return data;
		return new Error('Erro ao listar os registros');
	} catch (error) {
		//console.log(error);
		return new Error(error.message || 'Erro ao listar os registros');
	}
};

const RankingService = {
	getAll,
};

export { RankingService };