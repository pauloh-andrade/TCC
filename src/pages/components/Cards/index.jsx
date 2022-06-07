import styled from "styled-components";
import colors from "../../../shared/themes/Colors";

export const CardPost = styled.div`
    position: relative;
    box-shadow: 0 0 10px 1px rgb(0 0 0 / 4%);
    font-family: roboto;
    width: ${props => props.largura};
    min-height: ${props => props.altura};
    background-color: #fff;
    border-radius: .5rem;
    overflow: hidden;
    >h1{
       font-size: 2rem 
    }
`;

export const CardHeader = styled.div`
    background-image: linear-gradient(135deg, #6AC1FF, #1A76E3 90%);
    height: ${props => props.altura};
`;