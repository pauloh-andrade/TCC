import { Box, List, useTheme, IconButton, Icon } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import { useDrawerContext } from '../../../../shared/contexts';
import { ListItemLink } from '../listItemLink';
import { Logo } from '../../../../../public/Logo';
import { LogoName } from '../../../../../public/LogoName';
import { textTransform } from '@mui/system';

export const MenuDrawer = ({ children }) => {
	const theme = useTheme();

	const { isDrawerOpen, toggleDrawerOpen, drawerOptions } =
		useDrawerContext();
	return (
		<Box width="100vw" height="100vh">
			<Drawer
				variant="permanent"
				onClose={toggleDrawerOpen}
				overFlowX="hidden">
				<Box
					sx={{
						width: isDrawerOpen
							? theme.spacing(34)
							: theme.spacing(6.5),
						transition: theme.transitions.create(
							['width', 'margin'],
							{
								easing: theme.transitions.easing.sharp,
								duration:
									theme.transitions.duration.enteringScreen,
							}
						),
					}}
					borderRadius={0}
					backgroundColor="secondary.main"
					height="100%"
					dislay="flex"
					flexDirection="column">
					<Box
						width="100%"
						height="14%"
						display="flex"
						justifyContent="end">
						<Box width="100%" height={theme.spacing(10)} paddingRight={1} display="flex" flexDirection={isDrawerOpen? "row-reverse" : "column"} justifyContent="flex-start"  alignItems="center" gap={isDrawerOpen? 6: 1}>
							
							<IconButton
								
								size="small"
								onClick={toggleDrawerOpen}
								children={
									isDrawerOpen ? (
										<Icon>chevron_left</Icon>
									) : (
										<Icon>chevron_right</Icon>
									)
								}
								sx={{  color: 'primary.contrastText' }}
							/>
							{isDrawerOpen? (<LogoName width={130}/>) :  (<Logo width={30}/>)}
							
						</Box>
					</Box>
					<Box>
						<List>
							{drawerOptions.map(drawerOptions => {
								return (
									<ListItemLink
										key={drawerOptions.label}
										icon={drawerOptions.icon}
										path={drawerOptions.path}
										label={drawerOptions.label}
									/>
								);
							})}
						</List>
					</Box>
					<Box marginTop={5}>
						<ListItemLink 
							rotate={{transform: 'rotate(180deg)',}}
							color="#22507E"
							icon='exit_to_app_icon'
							path='/dashboard/login'
							label='Sair'
							logout
						/>
					</Box>
				</Box>
			</Drawer>
			<Box
				sx={{
					marginLeft: isDrawerOpen
						? theme.spacing(34)
						: theme.spacing(6.5),
					transition: theme.transitions.create(['width', 'margin'], {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen,
					}),
				}}
				backgroundColor="#f0f"
				display="flex"
				flexGrow={1}>
				{children}
			</Box>
		</Box>
	);
};
