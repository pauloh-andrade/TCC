import styles from './InputImage.module.css'
import {plus} from '../../dashboard/componnents/Icons'
import { useState } from 'react';
import { imageDefault } from '../Svg';

const InputImage = ({img, setImg}) =>{
   

    return(
        <div>
            <input className={styles.fileImage} id="file-img" type="file" name="imageFile" onChange={(e)=> setImg(e.target.files[0])}/>
            <label htmlFor="file-img">
                <div className={img == imageDefault ?styles.plusImage: styles.labelImage}>
                    {img === imageDefault ? imageDefault : <img className={styles.image} src={typeof img === "object"?URL.createObjectURL(img): img} />}
                </div>
            </label>
        </div>
    )
}

const InputImageFeed = ({img, setImg}) =>{
   

    return(
        <div>
            <input className={styles.fileImage} id="file-image" type="file" name="imageFile" onChange={(e)=> setImg(e.target.files[0])}/>
            <label htmlFor="file-image">
                <div className={img == null ? styles.plusImage: styles.labelImageFeed}>
                    {img == null ? null : <img className={styles.image} src={typeof img === "object"?URL.createObjectURL(img): img} />}
                </div>
            </label>
        </div>
    )
}

const InputImageComent = ({imgComent, setImgComent}) =>{
   

    return(
        <div>
            <input className={styles.fileImage} id="file-imageComent" type="file" name="imageFile" onChange={(e)=> setImgComent(e.target.files[0])}/>
            <label htmlFor="file-imageComent">
                <div className={imgComent == null ? styles.plusImage: styles.labelImageFeed}>
                    {imgComent == null ? null : <img className={styles.image} src={typeof imgComent === "object"?URL.createObjectURL(imgComent): imgComent} />}
                </div>
            </label>
        </div>
    )
}



export {InputImage, InputImageFeed, InputImageComent}