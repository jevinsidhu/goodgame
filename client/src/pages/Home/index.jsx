import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Card from "../../components/Card";

import { db } from "../../base";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    padding: 15px;

     a {
         text-decoration: none;
         color: initial;
     }
`;


const Home = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // db.collection("jevin.sidhu@gmail.com").add({
        //     gameId: 4004
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });

        const callApi = async () => {
            const response = await fetch('/api/trending');
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            
            return body;
          };

          callApi()
            .then(res => setGames(res.results))
            .catch(err => console.log(err))
    }, []);

    return (
        <Container>
            {games.length ? games.map((game, i) => (
                <a href={`/games/${game.id}`}>
                    <Card key={`videogame-${i}`} name={game.name} image={game.background_image} />
                </a>
            )) : <p>Loading...</p>}
        </Container>
    )
};

export default Home;