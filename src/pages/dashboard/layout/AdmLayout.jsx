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

const AdmLayout = ({ subtitle, onClick, children, sx, pagination, page, setPage, limit, totalCount, removeButton}) => {
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
						width={theme.spacing(60)}
						height={theme.spacing(14)}
						display="flex"
						flexDirection="column"
						gap={2}>
						<Typography
							variant={'h4'}
							color="primary.contrastText"
							fontFamily="poppins"
							backgroundColor="primary.abc"
							fontSize={28}
							>
							Controle de Administradores
						</Typography>
						<Typography
							width={theme.spacing(40)}
							color="primary.contrastText"
							fontFamily="poppins"
							fontSize={20}
							fontWeight="300">
							Gerencie os administradores da plataforma.
						</Typography>
					</Box>
					<Box
						width={theme.spacing(30)}
						height={theme.spacing(10)}
						alignSelf="flex-end"
						display="flex"
						justifyContent="flex-end"
						alignItems="flex-end">
						{!removeButton &&
							(
								<Button
							sx={{
								textTransform: 'capitalize',
								borderRadius: 5,
								paddingTop: 0.2,
								paddingBottom: 0.2,
								paddingLeft: 2,
								paddingRight: 2,
							}}
							size="small"
							onClick={onClick}
							color="info"
							variant="outlined"
							alignSelf="flex-end">
							Novo Administrador
						</Button>
							)
						}
					</Box>
				</Box>
				<Box
					sx={sx}
					width="100%"
					height="68vh"
					minHeight="400px"
					borderRadius={2}
					backgroundColor="#ffffff"
					marginTop={1.4}
					component={Paper}
					elevation={3}
					padding={2}
					overflow="hidden">
					{children}
				</Box>
				{pagination && (<Pagination
					sx={{marginTop: 2}}
					page={parseInt(page)}
					count={Math.ceil(totalCount / 12)}
					onChange={(e, newPage) => { setPage(newPage);  console.log(Math.ceil(totalCount / limit))}}
			/>)}
			</Container>
		</Box>
	);
};

export default AdmLayout;
