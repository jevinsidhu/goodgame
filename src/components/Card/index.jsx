import React from "react";
import styled from "styled-components";

const Container = styled.div`
    img {
        object-fit: cover;
        width: 300px;
        height: 300px;
        object-position: 0 0;
        margin: 10px 0;
    }
`

const Card = () => (
    <Container>
        <h1>Title</h1>
        <img src="https://cdn.singulart.com/artworks/v2/cropped/5877/main/fhd/713867_6ed990ab826a4975c232711091e55cdc.jpeg" alt="darth vader" />
        <p>Description</p>
    </Container>
);

export default Card;