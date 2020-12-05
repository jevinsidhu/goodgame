import React, { useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import app from "../../base";

const Container = styled.div`
    padding: 15px;
`;

const Header = styled.h1`
    font-size: 18px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
`;

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
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
  }, [history]);

    return (
        <Container>
            <Header>Sign Up</Header>
            <Form onSubmit={handleSignUp}>
              <label>
              Email
              <input name="email" type="email" placeholder="Email" />
              </label>
              <label>
              Password
              <input name="password" type="password" placeholder="Password" />
              </label>
              <button type="submit">Sign Up</button>
            </Form>
        </Container>
    )
};

export default withRouter(SignUp);