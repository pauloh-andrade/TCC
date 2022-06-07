import { useTheme } from '@emotion/react';
import { Button, capitalize, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/system';
import BaseLoginLayout from '../layout/BaseLoginLayout';
import { useContext, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { AdminService } from '../services/api/administrador/AdminService';
import { AuthAdmContext } from '../../../shared/contexts/AuthAdmContext';
import { AlertDialog } from '../componnents/AlertDialog';


const dashboard = () => {
  const theme = useTheme();
  const router = useRouter();
  const { message, setMessage} = useContext(AuthAdmContext);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


    const handleClickAlterPassword = () => {
    const {idUsuario} = parseCookies();
    if(password){
      if(password >7){
        if(confirmPassword){
          if (password == confirmPassword) {
            AdminService.update(
              {
                senha: password,
              },
              idUsuario
            ).then((result) => {
              if (result instanceof Error) {
                setMessage({
                  open: true,
                  severity: 'warning',
                  message: 'Falha ao redefinir senha.',
                });
                return;
              } else{
                setMessage({
                  open: true,
                  severity: 'success',
                  message: 'Senha alterada com sucesso.',
                });
              }
              
            });
            // destroyCookie(null, 'primeiroAcesso');
            router.push('/dashboard/login');
          }else{
            setMessage({
              open: true,
              severity: 'warning',
              message: 'A confirmação de senha deve corresponder a nova senha.',
            });
          }
        }else{
          setMessage({
            open: true,
            severity: 'warning',
            message: 'Confirme sua senha.',
          });
        }
      }else{
        setMessage({
          open: true,
          severity: 'warning',
          message: 'A senha deve conter pelo menos 8 caracteres.',
        });
      }
     
    }else{
      setMessage({
        open: true,
        severity: 'warning',
        message: 'Preencha sua nova senha.',
      });
    }
    
    };
  
 
	
	return (
			<BaseLoginLayout>
        <AlertDialog
						open={message.open}
						severity={message.severity}
						setOpen={setMessage}
						message={message.message}
					/>
      <Box
        width={500}
        height={350}
        backgroundColor="primary.contrastText"
        component={Paper}
        elevation={1}
        marginTop={20}
        padding={5}
      > 
        <Grid container direction="column" spacing={2}>
          <Grid item >
            <Typography
              fontSize={26}
              fontWeight={600}
              color="#565656"
            >
              Redefinição de senha
            </Typography>
           
          </Grid>
          <Grid item>
            <TextField value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth variant="standard" label="Nova senha " type={showPassword2 ? 'text' : 'password'}  InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        marginRight={5}    
                        onClick={()=> showPassword2? setShowPassword2(false) : setShowPassword2(true)}
                        >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
            }}/>
          </Grid>
          <Grid item display="flex" flexDirection="column">
            <TextField value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} fullWidth variant="standard" label="Confirme sua senha" type={showPassword ? 'text' : 'password'} InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        marginRight={5}    
                        onClick={()=> showPassword? setShowPassword(false) : setShowPassword(true)}
                        >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
            }}/>
           
          </Grid>
          <Grid item display="flex" alignItems="flex-end" justifyContent="flex-end" mt={5}>
            <Button onClick={()=>handleClickAlterPassword()}variant='contained' size="small" sx={{textTransform: "capitalize", width: 100}}>Entrar</Button>
          </Grid>
        </Grid>
        </Box>
			</BaseLoginLayout>
	
	);
};

export default dashboard;
