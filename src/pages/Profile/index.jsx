import styled from "styled-components";
import colors from "../../shared/themes/Colors";
import { ButtonProfile, BoxButtonsArea} from "../components/Buttons";
import { imageDefault, SvgBronze, SvgOuro, SvgPlatina } from "../components/Svg";
import { CardHeader, CardPost,} from "../components/Cards";
import { Button, Avatar } from "@mui/material";
import { Bookmark, CommentOutlined, FavoriteBorder, MoreHoriz, SendOutlined, TimelineOutlined } from "@mui/icons-material";
import HeaderMenu from "../components/Header";
import { PostCard, PostMain, PostPrimary } from "../components/Post";
import styles from './Profile.module.css'
import { useEffect, useState } from "react";
import { UserService } from "../services/api/user/UserService";


export default function Profile(){

    const [user, setUser] = useState();
    const [img, setImg] = useState();


    const dataUser = () => {
        UserService.getById(1).then(result => {
            if (result instanceof Error) {
				console.log(result.message);
				return;
			} else {
				setUser(result);
			}
        })
    }

    useEffect(() => {
        dataUser();
    }, [])

    // useEffect(() => {
        
    // }, [user])


    return(
        <>
         <HeaderMenu/>
         <div className="ContainerProfile">
                 <div className="CardPost" style={{height: "auto", width: "75vw"}}>
                      <div className="CardHeader" style={{height: "200px"}}></div>
                     <div className="MyAvatar" style={{height: "10rem", width: "10rem"}}>
                        {user && (<img src={'http://localhost:3500/uploads/'+user.foto}/>)}
                     </div>
                     <div className="ContainerInfo">
                         <div className="InfoTexts">
                             {user && (<h1>{user.apelido}</h1>)}
                             {user && (<p>{user.biografia}</p>)}
                             <div className="InfoStats">
                                 <p>Publicações</p>
                                 <span>00</span>
                             </div>
                             <div className="InfoStats">
                                 <p>Curtidas</p>
                                 <span>00</span>
                             </div>
                         </div>
                         <div className="InfoButtons">
                             <div>
                                 <Button variant="outlined" sx={{
                                    color: colors.primary,
                                    borderColor: colors.primary,
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    fontSize: 18,
                                    textTransform: "capitalize",

                                    "&:hover": {
                                        borderWidth: 2
                                    }
                                }}>Editar Perfil</Button>
                            </div>
                            <h2>Áreas de interesse</h2>
                            <div className="BoxButtonsArea">
                                <button className="ButtonProfile" style={{border: "solid 2px var(--colorIconLight)", color: "var(--colorIconLight)"}}>ola</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.BoxAchievement}>
                        <h2>Conquistas</h2>
                        <div>
                            <SvgBronze/>
                            <p>Bronze</p>
                        </div>
                        <div>
                            <SvgPlatina/>
                            <p>Platina</p>
                        </div>
                        <div>
                            <SvgOuro/>
                            <p>Ouro</p>
                        </div>
                    </div>
                 </div>
                <div className="ContainerCards">
                    <div className="CardPost" style={{height: "15vh", width: "50%"}}>
                        <div className="InfosCards" style={{padding: "4%"}}>
                            <Bookmark sx={{
                                fontSize: 32,
                                color: colors.primary
                            }}/>
                            <h2>Publicações Salvas</h2>
                        </div>
                        
                    </div>
                    <div className="CardPost" style={{height: "15vh", width: "50%"}}>
                        <div className="InfosCards" style={{padding: "4%"}}>
                                <TimelineOutlined sx={{
                                    fontSize: 32,
                                    color: colors.primary
                                }}/>
                                <h2>Minha Pontuação</h2>
                        </div>
                    </div>
                </div>
                   
             </div>
            </>
    );
    
}

