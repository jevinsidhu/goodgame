import React from "react";
import styled from "styled-components";

const Container = styled.div`
    background: #bfe6f3;
    padding: 10px;
    border-radius: 6px;
    text-align: center;
    align-self: center;

    h1 {
        font-size: 14px;
    }

    p {
        font-size: 12px;
        margin: 10px 0 0 0;
    }

    img {
        object-fit: cover;
        width: 300px;
        height: 300px;
        object-position: 50% 50%;
        margin: 10px 0;
    }
`

const Card = ({name, image}) => (
    <Container>
        <img src={image} alt="darth vader" />
        <h1>{name}</h1>
        <p>See Details</p>
    </Container>
);

export default Card;