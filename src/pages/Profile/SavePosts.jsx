import colors from "../../shared/themes/Colors";
import { SvgBronze, SvgCrown, SvgOuro, SvgPlatina } from "../components/Svg";
import { Alert, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, Tab, Tabs, TextField } from "@mui/material";
import { AddCircle, AddCircleOutline, AddCircleOutlined, Bookmark,  CommentOutlined, Edit, FavoriteBorder, FilterAlt, Image, InsertDriveFile, Leaderboard, MoreHoriz, PersonOutlined, VideoLibrary } from "@mui/icons-material";
import { UserService } from "../services/api/user/UserService.js";
import { useEffect, useState } from "react";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import styles from "./Profile.module.css"

export default function SavePosts(){


    return(
        <div className={styles.ContainerEditProfile}>
            <div className={styles.BackgroundGradient}>
            <h1>Publicações Salvas</h1>
            </div>
            <div style={{padding: '6% 25%'}} className={styles.ContentEditProfile}>
                <div  className={styles.BoxEditProfile}>
                <div className="CardPost" style={{minHeight: "15vh", width: "100%"}}>
                    <div className="PostCard" style={{padding: "3% 5%"}}>
                    <div className="PostPrimary">
                        <div>
                            <Avatar 
                                sx={{height: 54, width: 54}}
                                src="https://epipoca.com.br/wp-content/uploads/2021/03/Tobey-Maguire-as-Spider-Man-1200x900.jpg"/>
                            <div>
                                <h2>Bruno</h2>
                                <span>Agora mesmo</span>
                            </div>
                        </div>
                        <div>
                            <p></p>
                            <MoreHoriz sx={{fontSize: 28, color: colors.colorIcon}}/>
                        </div>
                    </div>
                    <div className="PostMain">
                        <h2>
                            Teste
                        </h2>
                        <p>Teste teste</p>
                        <img style={{maxHeight: "10vh"}} src="https://neilpatel.com/wp-content/uploads/2017/12/o-que-e-codigo-html.jpeg"/>
                        <div>
                            <div>
                                <FavoriteBorder sx={{color: colors.primary}}/>
                                132 curtidas
                            </div>
                            <div>
                                <CommentOutlined sx={{color: colors.primary}}/>
                                28 comentários
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
