import colors from "../../shared/themes/Colors";
import { imageDefault, SvgBronze, SvgCrown, SvgOuro, SvgPlatina } from "../components/Svg";
import { Alert, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, Tab, Tabs, TextField } from "@mui/material";
import { AddCircle, AddCircleOutline, AddCircleOutlined, Bookmark,  CommentOutlined, Edit, FavoriteBorder, FilterAlt, Image, InsertDriveFile, Leaderboard, MoreHoriz, PersonOutlined, VideoLibrary } from "@mui/icons-material";
import { UserService } from "../services/api/user/UserService.js";
import { useEffect, useState } from "react";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import styles from "./Profile.module.css"
import Chip from "../components/Buttons";
import { InputImage } from "../components/InputImage";
import { plus } from "../dashboard/componnents/Icons";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function EditProfile(){


    const [value, setValue] = React.useState(0);
    const [user, setUser] = useState();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [sobre, setSobre] = useState();
  
  const [tag, setTag] = useState();
  const [img, setImg] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
 
    const dataUser = (id) => {
      UserService.getById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          setUser(result);
          console.log(result);
        }
      });
    }

    const updateUser = () => {
      //form data
      const formData = new FormData();

      formData.append('nome', nome);
      formData.append('apelido', tag);
      formData.append('biografia', sobre);
      formData.append('files', img);

      UserService.update(formData, user.tblUsuarioIdUsuario).then((result) => {
        alert("perfil atualizado com sucesso!");
        dataUser(1);
      });

      //service
      /* const result = UserService.update(
        {
          nome,
          biografia: sobre,
          apelido: tag
        },
        user.tblUsuarioIdUsuario
      ).then(() => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          alert("perfil atualizado com sucesso!");
          dataUser(45);
        }
      }); */
    };

    const removeUserImage = () => {
      UserService.removeImage(user.idUsuarioComum).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          alert("Imagem excluída com sucesso!")
        }
      });
    }

  useEffect(() => {
    dataUser(1);
  }, []);

  useEffect(() => {
    if(user){
      setEmail(user.tblUsuario.email);
      setNome(user.tblUsuario.nome);
      setSobre(user.biografia);
      setTag(user.apelido);
      if(user.foto == ""){
        setImg(imageDefault);
      }
      else{
        setImg('http://localhost:3500/uploads/' + user.foto);
      }
    }
      
  }, [user]);
 
    return(
        <div onLoadedMetadata={console.log(sobre, nome, tag)} className={styles.ContainerEditProfile}>
            <div className={styles.BackgroundGradient}>
            </div>
            <div className={styles.ContentEditProfile}>
                <div className={styles.BoxEditProfile}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label= "Informações Pessoais" {...a11yProps(0)} />
                    <Tab label="Cursos" {...a11yProps(1)} />
                </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className={styles.BoxEdit}>
                        <div className={styles.ImageEdit}>
                            <h2>Foto de perfil</h2>
                            <figure>
                              <InputImage img={img} setImg={setImg}/>
                            </figure>
                        </div>
                        <div className={styles.ButtonsEdit}>
                        <label htmlFor="file-img">
                            <Button variant="contained">Mudar foto</Button>
                        </label>
                            <Button onClick={() => removeUserImage()} variant="outlined">Excluir</Button>
                        </div>
                    </div>
                    <div>
                      <TextField id="outlined-basic" required label="Nome" variant="outlined" value={nome} sx={{
                        width: "55%",
                        marginRight: "2%",
                        }} 
                        onChange={(e)=>{setNome(e.target.value)}}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      <TextField id="outlined-basic" label="Nome de usuário" variant="outlined" sx={{
                        width: "43%",
                      }} 
                        value={tag} 
                        onChange={(e)=>{setTag(e.target.value)}}
                        InputLabelProps={{
                          shrink: true,
                        }}

                      />
                      <TextField id="outlined-basic" 
                        margin="normal" label="Biografia" 
                        variant="outlined" 
                        fullWidth 
                        value={sobre} 
                        onChange={(e)=>{setSobre(e.target.value)}}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <div style={{marginTop: 50, width: "100%", textAlign: "end"}}>
                      <Button onClick={updateUser} variant="contained" sx={{
                        marginRight: 1,
                      }}> Salvar</Button>
                      <Button variant="contained" sx={{
                        backgroundColor: "#cccccc", 
                        color: colors.text,
                        '&:hover':{
                          backgroundColor: '#b2b2b2'
                        }}}>Cancelar</Button>
                    </div> 
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h2 className={styles.titleEdit} style={{color: "var(--textSecondary)"}}>Áreas de interesse</h2>
                    <div className={styles.boxAreas}>
                      <h2 className={styles.titleEdit} style={{color: "var(--primary)"}}>Adicionar áreas de interesse <AddCircleOutline sx={{marginLeft: 2}}/></h2>
                      <Chip valueChip="ola"/>
                    </div>
                    <div style={{marginTop: 8, width: "100%", textAlign: "end"}}>
                      <Button  variant="contained" sx={{
                        marginRight: 1,
                      }}> Salvar</Button>
                      <Button variant="contained" onClick={() => {console.log(sobre) }} sx={{
                        backgroundColor: "#cccccc", 
                        color: colors.text,
                        '&:hover':{
                          backgroundColor: '#b2b2b2'
                        }}}>Cancelar</Button>
                    </div>
                </TabPanel>
                </div>
            </div>
        </div>
    );
}

