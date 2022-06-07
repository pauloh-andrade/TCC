import styled from "styled-components";
import * as React from 'react';
import styles from "./buttons.module.css"

export const Chip = ({valueChip, label}) => {
    return(
        <div className={styles.ContentCheckbox}>
            <article className={styles.checkbox}>
                <input type="checkbox" />
                <div>
                    <span>
                    {label}
                    </span>
                </div>
            </article>
        </div>
    );
}
