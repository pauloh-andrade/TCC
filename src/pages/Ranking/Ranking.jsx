import colors from "../../shared/themes/Colors";
import { imageDefault, SvgBronze, SvgCrown, SvgOuro, SvgPlatina } from "../components/Svg";
import { Alert, Avatar, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack } from "@mui/material";
import { Bookmark,  CommentOutlined, Diamond, Edit, FavoriteBorder, FilterAlt, Image, InsertDriveFile, Leaderboard, MoreHoriz, VideoLibrary } from "@mui/icons-material";
import { UserService } from "../services/api/user/UserService.js";
import { useEffect, useState } from "react";
import * as React from 'react';
import styles from "./Ranking.module.css"
import { RankingService } from "../services/api/ranking/rankingService";

export default function Ranking (){

    const [ranking, setRanking] = useState([]);
    const img = imageDefault;

    const listRanking = () => {
        RankingService.getAll(10).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setRanking(result.usuarios);
                //console.log(result.usuarios)
			}
		});
    }

    useEffect(()=>{
        listRanking();
    }, [])



    return(
        <div className={styles.ContainerRanking}>
            <div className={styles.BackgroundGradient}>
                <h1>Ranking</h1>
            </div>
            <div className={styles.ContentRanking}>
                <div className={styles.BoxRanking}>
                   <table className={styles.TableRanking}>
                       <thead>
                           <tr>
                               <th>Posição</th>
                               <th>Foto</th>
                               <th>Nome</th>
                               <th>Pontuação</th>
                           </tr>
                       </thead>
                       <tbody>
                       {ranking.map((row, i) => {
                           return(
                            <tr>
                               <td style={{color: i == 0 ? '#dcbe00' : i == 1 ? '#a0a0a0' : i == 2 ? '#b35e11': colors.primary}}>{i + 1 +'º'}</td>
                               <td className={styles.containerImage}>
                                    <div className={styles.MyAvatar} style={{height: "2.5rem", width: "2.5rem", borderColor: i == 0 ? '#ffde0c' : i == 1 ? '#c6c6c6' : i == 2 ? '#b76c13': colors.primary}}>
                                    {row.foto == "" ? row && (imageDefault) : row && (<img src={"http://10.107.144.27:8080/uploads/"+row.foto}/>)}
                                    </div>
                               </td>
                               {row && (<td>{row.tblUsuario.nome}</td>)}
                               {row && (<td style={{color: '#c000ff'}}><Diamond sx={{verticalAlign: "bottom", marginRight: 1}}/>{row.pontuacao} pts</td>)}
                           </tr>
                           );
                       })}
                       </tbody>
                   </table>
                </div>
            </div>
        </div>
    );
}