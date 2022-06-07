import { useTheme, Grid, useMediaQuery, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { MenuDrawer } from '../componnents/menuDrawer/MenuDrawer';
import { useDrawerContext } from '../../../shared/contexts';
import BaseCleanLayout from '../layout/BaseCleanLayout';
import { CardCurso } from '../componnents/CardCurso';
import { CardAdd } from '../componnents/CardAdd';
import { CursoService } from '../services/api/curso/CursoService';
import { parseCookies } from 'nookies';


const dashboard = () => {
	const theme = useTheme();
	const { handleSetDrawerOptions } = useDrawerContext();

	const lgDown = useMediaQuery(theme.breakpoints.down(1400));
	const exUp = useMediaQuery(theme.breakpoints.up(1900));

	const [cursos, setCursos] = useState('');
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(1);

	const findAllCursos = () => {
		CursoService.getAll(page).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setTotalCount(result.size);
				setCursos(result.cursos);
			
				// cursos(result);
			}
		});
	};

	useEffect(() => {
		findAllCursos();
	}, [page]);

	useEffect(() => {
		handleSetDrawerOptions([
			{
				icon: 'person_add_alt_1',
				path: '/dashboard/usuarios',
				label: 'Usuários',
			},
			{
				icon: 'school',
				path: '/dashboard/cursos',
				label: 'Cursos',
			},
			{
				icon: 'auto_stories',
				path: '/dashboard/materias',
				label: 'Matérias',
			},
			{
				icon: 'gpp_good',
				path: '/dashboard/administradores',
				label: 'Administradores',
			},
		]);
	}, []);
	
	return (
		<MenuDrawer>
			<BaseCleanLayout pagination totalCount={totalCount} page={page} setPage={setPage} limit={cursos.length} >
				<Grid container width="100%" height="100%">
				<Grid
						item
						xs={3}
						padding={1}
						height={
							lgDown
								? theme.spacing(30)
								: exUp
								? theme.spacing(43)
								: theme.spacing(35)
						}>
						<CardAdd findCursos={findAllCursos}/>
					</Grid>
					{
						cursos.length > 0 && cursos.map(curso => (	
							<Grid
								key={curso.idCurso}
								item
								xs={3}
								height={
									lgDown
										? theme.spacing(30)
										: exUp
										? theme.spacing(43)
										: theme.spacing(35)
									}
								padding={1}>
								<CardCurso getCursos={ findAllCursos}id={curso.idCurso} foto={curso.cursoImagem} nome={curso.cursoNome} imagem={curso.cursoImagem} />
								</Grid>
							)
						)
					}

								


					{/* // 	<Grid
					// 		key={row.idCurso}
					// 		item
					// 		xs={3}
					// 		height={
					// 			lgDown
					// 				? theme.spacing(30)
					// 				: exUp
					// 				? theme.spacing(43)
					// 				: theme.spacing(35)
					// 		}
					// 		padding={1}>
					// 		<CardCurso id={row.idCurso} nome={row.cursoNome} imagem={row.cursoImagem} setCursos={findAllCursos}/>
							
					// 	</Grid>
					// )
					
					// ) */}
					
				</Grid>
			</BaseCleanLayout>
		</MenuDrawer>
	);
};

export const getServerSideProps = async ({ req }) => {
	const { ['teclearn.token']: token } = parseCookies({ req });

	if (!token) {
		return {
			redirect: {
				destination: '/dashboard/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default dashboard;
