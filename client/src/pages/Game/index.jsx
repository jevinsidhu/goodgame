import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { db } from "../../base";
import { AuthContext } from "../../components/Auth";

const Container = styled.div`
  display: flex;
  place-content: center;
  padding: 50px;
`;

const Wrapper = styled.div`
  width: 750px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin: 20px 0;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: 0% 0%;
`;

const ScreenshotWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 30px 0;

  img {
    object-fit: cover;
  }
`;

const Screenshot = styled.img`
  width: 100%;
`;

const ManageList = styled.div`
  margin: 10px 0;

  > button {
    background-color: black;
    color: white;
    padding: 15px;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: none;
    }
  }
`;

const ListWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin: 10px 0;
`;

const ListItem = styled.button`
  background-color: ${(props) => (props.isPresent ? "red" : "green")};
  padding: 15px;
  color: white;
  text-align: left;

  span {
    font-weight: bold;
  }

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;

const PlatformWrapper = styled.div`
  display: flex;
`;

const Platform = styled.p`
  background-color: grey;
  padding: 10px 15px;
  color: white;
  border-radius: 12px;
  width: max-content;
  margin: 0 10px 0 0;
  font-size: 14px;
`;

const ReviewsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const Review = styled.div`
  border: 1px solid black;
  border-radius: 12px;
  padding: 15px;
`;

const Author = styled.p`
  font-weight: bold;
  font-size: 10px;

  span {
    font-weight: normal;
    color: grey;
  }
`;

const ReviewContent = styled.p`
  margin: 10px 0;
`;

const CreateReview = styled.div`
  margin: 10px 0;

  > button {
    margin: 20px 0 10px 0;
    background-color: black;
    color: white;
    padding: 15px;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: none;
    }
  }
`;

const Form = styled.form`
  display: grid;
  margin: 10px 0 0 0;
  border: 1px solid black;
  border-radius: 12px;
  padding: 15px;

  input[type="submit"] {
    margin: 10px 0 0 0;
    color: white;
    background-color: black;
    padding: 10px;
    border: none;
    border-radius: 6px;
  }

  textarea {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding: 15px;
    resize: none;

    &:focus {
      outline: none;
    }
  }
`;

const Error = styled.p`
  color: red;
  font-size: 10px;
  margin: 10px 0 0 0;
`;

const Game = () => {
  const [game, setGame] = useState();
  const [showLists, setShowLists] = useState(false);
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [lists, setLists] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const fetchLists = () => {
    if (currentUser) {
      const fetchedLists = [];

      db.collection("lists")
        .where("author", "==", currentUser.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedLists.push({
              id: doc.id,
              data,
              isPresent: data.games.find((listGame) => listGame.id === game.id),
            });
          });
        })
        .then(() => {
          setLists(fetchedLists);
        });
    }
  };

  const fetchReviews = () => {
    const fetchedReviews = [];

    db.collection("reviews")
      .where("gameId", "==", game.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          fetchedReviews.push(doc.data());
        });
      })
      .then(() => setReviews(fetchedReviews));
  };

  const toggleList = () => {
    setShowLists((prev) => !prev);
  };

  const handleClick = (id, isPresent) => {
    const ref = db.collection("lists").doc(id);

    if (isPresent) {
      ref
        .update({
          games: firebase.firestore.FieldValue.arrayRemove({
            title: game.name,
            id: game.id,
          }),
        })
        .then(() => fetchLists());
    } else {
      ref
        .update({
          games: firebase.firestore.FieldValue.arrayUnion({
            title: game.name,
            id: game.id,
          }),
        })
        .then(() => fetchLists());
    }
  };

  const toggleCreateReview = () => {
    setShowCreateReview((prev) => !prev);
  };

  const handleCreateReview = (event) => {
    event.preventDefault();

    const { content } = event.target.elements;
    const { email } = currentUser;

    if (content.value === "") {
      setError("Cannot send a blank review");
      return;
    }

    db.collection("reviews")
      .doc()
      .set({
        author: email,
        content: content.value,
        gameId: game.id,
      })
      .then(function (docRef) {
        fetchReviews();
        toggleCreateReview();
        setError("");
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    if (game) {
      fetchReviews();
      fetchLists();
    }
  }, [game]);

  useEffect(() => {
    const callApi = async () => {
      const response = await fetch(`/api/videogame/${id}`);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    callApi()
      .then((res) => setGame(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {game ? (
        <Wrapper>
          <PlatformWrapper>
            {game.platforms.map((plat) => (
              <Platform>{plat.platform.name}</Platform>
            ))}
          </PlatformWrapper>
          <Header>{game.name}</Header>
          <Image src={game.background_image} alt="background image" />
          {currentUser && (
            <ManageList>
              <button onClick={toggleList}>Manage Lists</button>
              {showLists && (
                <ListWrapper>
                  {lists.map((list) => (
                    <ListItem
                      key={list.data.title}
                      isPresent={list.isPresent}
                      onClick={() => handleClick(list.id, list.isPresent)}
                    >
                      {list.isPresent ? "Remove from " : "Add to "}
                      <span>{list.data.title}</span>
                    </ListItem>
                  ))}
                </ListWrapper>
              )}
            </ManageList>
          )}
          <h3>Description</h3>
          <p>{game.description_raw}</p>
          <ScreenshotWrapper>
            {game.screenshots.map((screenshot) => (
              <Screenshot
                key={screenshot.id}
                src={screenshot.image}
                alt={screenshot.id}
              />
            ))}
          </ScreenshotWrapper>
          <h3>Reviews</h3>
          {reviews.length ? (
            <ReviewsWrapper>
              {reviews.map((review) => (
                <Review>
                  <Author>
                    Author: <span>{review.author}</span>
                  </Author>
                  <ReviewContent>{review.content}</ReviewContent>
                </Review>
              ))}
            </ReviewsWrapper>
          ) : (
            <p>No reviews yet.</p>
          )}
          <CreateReview>
            <button onClick={toggleCreateReview}>Create Review</button>
            {showCreateReview && (
              <Form onSubmit={handleCreateReview}>
                <h3>Write a Review</h3>
                <textarea placeholder="Write your review here" name="content" />
                {error && <Error>{error}</Error>}
                <input type="submit" value="Create Review" />
              </Form>
            )}
          </CreateReview>
        </Wrapper>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default Game;
