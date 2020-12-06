import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../components/Auth";

import { db } from "../../base";

const Container = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
`;

const Form = styled.form`
  display: flex;

  input[type="text"] {
    border-radius: 12px 0 0 12px;
    background-color: #f9f9f9;
    border: 1px solid #d3d3d3;
    border-right: none;
    color: black;
    padding: 10px 15px;

    &:focus {
      outline: none;
    }
  }

  input[type="submit"] {
    border: none;
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 0 12px 12px 0;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const ListsContainer = styled.div``;

const CreateListContainer = styled.div``;

const Header = styled.h1`
  font-size: 24px;
  margin: 30px 0;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const ListItem = styled.div`
  padding: 15px;
  border: 1px solid black;
  border-radius: 6px;

  h3 {
    font-size: 18px;
    margin: 10px 0 5px 0;
  }

  p {
    font-size: 14px;
  }
`;

const Game = styled.ul`
  a {
    text-decoration: none;
    color: black;

    &:hover {
      color: grey;
    }

    li {
      margin: 0 0 5px 0;
    }
  }
`;

const Lists = () => {
  const [lists, setLists] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const updateLists = () => {
    const fetchedLists = [];

    db.collection("lists")
      .where("author", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => fetchedLists.push(doc.data()));
      })
      .then(() => {
        setLists(fetchedLists);
      });
  };

  const createList = (event) => {
    event.preventDefault();

    const { title } = event.target.elements;
    const { email } = currentUser;

    db.collection("lists")
      .doc()
      .set({
        title: title.value,
        author: email,
        games: [],
      })
      .then(function (docRef) {
        updateLists();
        document.querySelector("form").reset();
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    updateLists();
  }, []);

  return (
    <Container>
      <ListsContainer>
        <Header>Lists</Header>
        <ListWrapper>
          {lists.length !== 0 ? (
            lists.map((list) => (
              <ListItem>
                <h3>{list.title}</h3>
                <p>Number of Games: {list.games.length}</p>
                <Game>
                  {list.games.map((game) => (
                    <a href={`games/${game.id}`}>
                      <li>{game.title}</li>
                    </a>
                  ))}
                </Game>
              </ListItem>
            ))
          ) : (
            <p>No lists created.</p>
          )}
        </ListWrapper>
      </ListsContainer>

      <CreateListContainer>
        <Header>Create New List</Header>
        <Form onSubmit={createList}>
          <input placeholder="Title" type="text" name="title" />
          <input type="submit" value="Create New List" />
        </Form>
      </CreateListContainer>
    </Container>
  );
};

export default Lists;
