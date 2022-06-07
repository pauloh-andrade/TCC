import styled from "styled-components";
import * as React from 'react';

export default function Chip({valueChip}){
    return(
        <div className="ContentCheckbox">
            <article className="checkbox">
                <input type="checkbox" value={valueChip}/>
                <div>
                    <span>
                    Desenvolvimento
                    </span>
                </div>
            </article>
        </div>
    );
}