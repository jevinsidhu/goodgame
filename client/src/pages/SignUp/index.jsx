import React, { useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import app from "../../base";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 82px);
`;

const Wrapper = styled.div`
  padding: 50px;
  border-radius: 12px;
  border: 1px solid black;
`;

const Header = styled.h1`
  font-size: 32px;
  text-align: center;
  margin: 0 0 20px 0;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 20px;
  width: 500px;

  input[type="email"] {
    padding: 10px;
  }

  input[type="password"] {
    padding: 10px;
  }

  input[type="submit"] {
    background-color: black;
    border: none;
    color: white;
    border-radius: 6px;
    padding: 12px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: none;
    }
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 5px 0;
  }
`;

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <Container>
      <Wrapper>
        <Header>Sign Up</Header>
        <Form onSubmit={handleSignUp}>
          <Field>
            <label>Email</label>
            <input placeholder="Email" name="email" type="email" />
          </Field>
          <Field>
            <label>Password</label>
            <input placeholder="Password" name="password" type="password" />
          </Field>
          <input type="submit" value="Sign Up" />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default withRouter(SignUp);
