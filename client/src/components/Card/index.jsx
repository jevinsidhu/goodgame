import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 6px;
  text-align: center;
  align-self: center;
  border: 1px solid black;

  h1 {
    font-size: 14px;
    margin: 10px 0;
    padding: 0;
  }

  p {
    font-size: 12px;
    margin: 10px 0;
  }

  p span {
    font-weight: bold;
  }

  img {
    object-fit: cover;
    width: 300px;
    height: 300px;
    object-position: 50% 50%;
    border-radius: 6px 6px 0 0;
  }
`;

const Card = ({ name, image, genres }) => (
  <Container>
    <img src={image} alt={name} />
    <h1>{name}</h1>
    <p>
      <span>Genres:</span>{" "}
      {genres.map((genre, i) =>
        i === genres.length - 1 ? genre.name : `${genre.name}, `
      )}
    </p>
  </Container>
);

export default Card;
