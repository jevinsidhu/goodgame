import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../Auth";
import app from "../../base";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(229, 231, 235);

  a {
    text-decoration: none;
    color: black;

    &:hover {
      opacity: 0.7;
    }
  }

  a:first-child h1 {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
  }

  button {
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 700px) {
    padding: 10px;

    a:first-child h1 {
      font-size: 18px;
    }
  }
`;

const SignedInContainer = styled.div`
  display: flex;

  > a {
    margin: 0 40px;
    align-self: center;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 700px) {
    > a {
      font-size: 12px;
    }
  }
`;

const SignedInWrapper = styled.div`
  button {
    font-size: 14px;
    color: grey;
    margin: 0;
    padding: 0;
    display: block;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 700px) {
    p {
      font-size: 10px;
    }

    button {
      font-size: 10px;
    }
  }
`;

const SignWrapper = styled.div`
  display: flex;
  align-items: center;

  a:first-child {
    margin: 0 10px 0 0;
    color: rgb(107, 114, 128);
  }

  a:nth-child(2) {
    font-weight: 700;
    background-color: black;
    padding: 10px;
    border-radius: 6px;

    button {
      color: white;
    }
  }
`;

const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container>
      <a href="/">
        <h1>GoodGame</h1>
      </a>
      {currentUser ? (
        <SignedInContainer>
          <a href="/lists">
            <p>My Lists</p>
          </a>
          <SignedInWrapper>
            <p>{currentUser.email}</p>
            <button onClick={() => app.auth().signOut()}>Sign out</button>
          </SignedInWrapper>
        </SignedInContainer>
      ) : (
        <SignWrapper>
          <a href="/signin">
            <button>Sign In</button>
          </a>
          <a href="/signup">
            <button>Sign Up</button>
          </a>
        </SignWrapper>
      )}
    </Container>
  );
};

export default Nav;
