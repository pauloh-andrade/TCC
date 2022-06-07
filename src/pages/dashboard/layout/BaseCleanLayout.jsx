import {
	Box,
	Container,
	Paper,
	Button,
	useMediaQuery,
	Typography,
	Pagination,
} from '@mui/material';
import { theme } from '../../../shared/themes';

const BaseCleanLayout = ({ title, subtitle, onClick, pagination, children, page, totalCount, setPage, limit}) => {
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	

	return (
		<Box
			flexGrow={1}
			height={theme.spacing(35)}
			backgroundColor="primary.main"
			paddingTop={theme.spacing(4)}>
			<Container
				maxWidth="lg"
				sx={{
					'&.MuiContainer-maxWidthLg': {
						maxWidth: '2000px',
						width: '80vw',
						minWidth: '1000px',
					},
				}}>
				<Box
					width="100%"
					height={theme.spacing(14)}
					display="flex"
					justifyContent="space-between">
					<Box
						width={theme.spacing(50)}
						height={theme.spacing(14)}
						display="flex"
						flexDirection="column"
						gap={3}>
						<Typography
							variant={'h4'}
							color="primary.contrastText"
							fontFamily="poppins"
							backgroundColor="primary.abc"
							fontSize={28}
							>
							Controle de cursos
						</Typography>
						<Typography
							width={theme.spacing(40)}
							color="primary.contrastText"
							fontFamily="poppins"
							fontSize={20}
							fontWeight="300">
							Gerencie os cursos da plataforma.
						</Typography>
					</Box>
					<Box
						width={theme.spacing(30)}
						height={theme.spacing(10)}
						alignSelf="flex-end"
						display="flex"
						justifyContent="flex-end"
						alignItems="flex-end"></Box>
				</Box>
				<Box
					width="100%"
					minHeight="400px"
					marginTop={5}
					elevation={3}
					overflow="hidden"
					display="flex"
					flexWrap="wrap"
					gap={4}
					alignSelf="center">
					{children}
				</Box>
				{pagination && (<Pagination
					sx={{marginTop: 3}}
					page={page}
					count={Math.ceil(totalCount / 7)}
					onChange={(e, newPage) => { setPage(newPage)}}
			/>)}
			</Container>
		</Box>
	);
};

export default BaseCleanLayout;
