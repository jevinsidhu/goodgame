import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Card from "../../components/Card";

const Container = styled.div`
  display: flex;
  place-content: center;
`;

const Header = styled.h1`
  margin: 30px 0;
`;

const Wrapper = styled.div`
  width: min-content;
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

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 970px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SearchWrapper = styled.form``;

const Search = styled.input`
  border-radius: 12px 0 0 12px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-right: none;
  color: black;
  padding: 10px 15px;

  &:focus {
    outline: none;
  }
`;

const SubmitSearch = styled.input`
  border: 1px solid black;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 0 12px 12px 0;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Home = ({ history }) => {
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

  const handleSearch = (event) => {
    event.preventDefault();

    const { search } = event.target.elements;
    history.push(`/search/${search.value}`);

    console.log("Search");
  };

  return (
    <Container>
      <Wrapper>
        {games.length ? (
          <>
            <SearchWrapper onSubmit={handleSearch}>
              <Search
                type="text"
                placeholder="Enter a game title"
                name="search"
              />
              <SubmitSearch type="submit" value="Search" />
            </SearchWrapper>
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

export default withRouter(Home);
