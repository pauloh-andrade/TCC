import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const AlertDialog = ({ open, severity, setOpen, message }) => {
	const handleClose = () => {
		setOpen({ open: false, severity: '' });
	};
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<Alert variant="filled" severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export { AlertDialog };
