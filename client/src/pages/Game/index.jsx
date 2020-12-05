import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
    padding: 15px;
`;

const Header = styled.h1`
    font-size: 24px;
`;

const Image = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: 0% 0%;
`;

const ScreenshotWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
`;

const Screenshot = styled.img`
    width: 100%;
`;

const Game = () => {
    const [game, setGame] = useState();
    const { id }  = useParams();

    useEffect(() => {
        const callApi = async () => {
            const response = await fetch(`/api/videogame/${id}`);
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            
            return body;
          };

          callApi()
            .then(res => setGame(res))
            .catch(err => console.log(err))
    }, []);

    return game ?
        <Container>
            <Header>{game.name}</Header>
            <Image src={game.background_image} alt="background image" />
            <h3>Description</h3>
            <p>{game.description_raw}</p>
            <ScreenshotWrapper>
                {game.screenshots.map(screenshot => <Screenshot src={screenshot.image} alt={screenshot.id} />)}
            </ScreenshotWrapper>
        </Container>
        : <p>Loading...</p>    
};

export default Game;