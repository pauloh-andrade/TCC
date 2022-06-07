import { useTheme } from '@emotion/react';
import { Button, capitalize, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { AlertDialog } from '../componnents/AlertDialog';
import BaseLoginLayout from '../layout/BaseLoginLayout';
import { LoginService } from '../services/api/login/LoginService';


const dashboard = () => {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState();

  const [message, setMessage] = useState({
		open: false,
		severity: '',
		message: '',
	});

  const handleClickSendEmail = () => {
    if(email){
      LoginService.sendEmail({
        email,
      }).then(result => {
        if (result instanceof Error) {
          setMessage({
            open: true,
            severity: 'warning',
            message: 'E-mail inválido, preencha novamente.',
          });
          setEmail("");
          return;
        } else if(result.token){
          console.log(result);
          setCookie(null, 'newPasswordToken', result.token, {
            maxAge: 60 * 60 * 1, // 1 hour
          });
          setCookie(null, 'idUsuario', result.idUsuario, {
            maxAge: 60 * 60 * 1, // 1 hour
          });
          setCookie(null, 'email', result.email, {
            maxAge: 60 * 60 * 1, // 1 hour
          });
          router.push('/dashboard/login/verificarToken');
        }
      });
    }else{
      setMessage({
				open: true,
				severity: 'warning',
				message: 'Preencha seu email.',
			});

    }
  }
   
	
	return (
			<BaseLoginLayout>
      <Box
        width={500}
        height={350}
        backgroundColor="primary.contrastText"
        component={Paper}
        elevation={1}
        marginTop={20}
        padding={4.5}
      > 
       <AlertDialog
						open={message.open}
						severity={message.severity}
						setOpen={setMessage}
						message={message.message}
					/>
        <Grid container direction="column" spacing={2}>
          <Grid item >
            <Typography
              fontSize={26}
              fontWeight={600}
              color="#565656"
            >
               Esqueceu a senha?
            </Typography>
            <Typography
              fontSize={18}
              fontWeight={400}  
              color="#737C88"
            >
             Digite seu email para indentificarmos sua conta.
            </Typography>
          </Grid>
          <Grid item marginTop={4}>
            <TextField value={email} onChange={(e)=> setEmail(e.target.value)} fullWidth variant="standard" label="Confirme seu E-mail" placeholder='email.example@email.com' />
          </Grid>
          
          <Grid item display="flex" alignItems="flex-end" justifyContent="flex-end" mt={5}>
            <Button onClick={()=>handleClickSendEmail()} variant='contained' size="small" sx={{textTransform: "capitalize", width: 100}}>Entrar</Button>
          </Grid>
        </Grid>
        </Box>
			</BaseLoginLayout>
	
	);
};

export default dashboard;
