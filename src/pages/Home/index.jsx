import React from "react";
import styled from "styled-components";

import Nav from "../../components/Nav";
import Card from "../../components/Card";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px 0;
    padding: 15px;
`;

const Home = () => {
    const dummyArr = [1, 2, 3, 4];
    fetch("https://api.rawg.io/api/games?key=62449b677ea04d3792392adb21f5497a", { mode: 'no-cors' })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log("error"));

    return (
        <>
            <Nav />
            <Container>
                {dummyArr.map((_, i) => (
                    <Card key={`videogame-${i}`} />
                ))}
            </Container>
        </>
    )
};

export default Home;