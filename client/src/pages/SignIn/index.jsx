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

const SignIn = ({ history }) => {
    const handleSignIn = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await app
              .auth()
              .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
          } catch (error) {
            alert(error);
          }
        },
        [history]
      );

    return (
        <Container>
            <Header>Sign In</Header>
            <Form onSubmit={handleSignIn}>
                <input name="email" type="email" />
                <input name="password" type="password" />
                <input type="submit" value="Submit"/>
            </Form>
        </Container>
    )
};

export default withRouter(SignIn);