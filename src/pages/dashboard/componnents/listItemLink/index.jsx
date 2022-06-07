import { useRouter } from 'next/router';
import { useDrawerContext } from '../../../../shared/contexts/DrawerContext';
import {
	ListItemButton,
	ListItemIcon,
	Icon,
	ListItemText,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { destroyCookie } from 'nookies';

const ListItemLink = ({ path, icon, label, onClick, color, rotate, logout}) => {
	const theme = useTheme();
	const router = useRouter();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	const { isDrawerOpen } = useDrawerContext();
	const selected = router.pathname == path ? true : false;
	const handleClick = () => {
		if (logout) {
			console.log("dasda");
			destroyCookie(null, 'idUsuario',{path: '/'});
			destroyCookie(null, 'primeiroAcesso',{path: '/'});
			destroyCookie(null, 'teclearn.token',{path: '/'});
		}
		router.push(path);
		onClick?.();
	};

	return (
		<ListItemButton
			selected={selected}
			onClick={handleClick}
		
			sx={{
				backgroundColor: color,
				height: theme.spacing(6),
				overflow: 'hidden',
			}}>
			<ListItemIcon >
				<Icon  sx={{ ...rotate , '&.material-icons':{
					fontSize: 20
				}, color: 'primary.contrastText' }}>{icon}</Icon>
			</ListItemIcon>
			<ListItemText
				primary={isDrawerOpen ? label : ''}
				primaryTypographyProps={{
					color: 'primary.contrastText',
					fontSize: 16,
					fontFamily: 'poppins',
					whiteSpace: 'nowrap',
				}}
			/>
		</ListItemButton>
	);
};

export { ListItemLink };
