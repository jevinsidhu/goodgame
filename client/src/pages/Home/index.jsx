import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Card from "../../components/Card";

const Container = styled.div`
  display: flex;
  place-content: center;
`;

const Header = styled.h1`
  margin: 30px 0;
`;

const Wrapper = styled.div`
  width: max-content;
  margin: 40px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;

  a {
    text-decoration: none;
    color: initial;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await fetch("/api/trending");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    callApi()
      .then((res) => setGames(res.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Wrapper>
        {games.length ? (
          <>
            <Header>Trending Games</Header>
            <Grid>
              {games.map((game, i) => (
                <a href={`/games/${game.id}`}>
                  <Card
                    key={`videogame-${i}`}
                    name={game.name}
                    image={game.background_image}
                    genres={game.genres}
                  />
                </a>
              ))}
            </Grid>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
