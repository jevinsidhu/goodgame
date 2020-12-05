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
    }

    a:first-child h1 {
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
    }

    button {
        font-size: 16px;
    }
`;

const SignedInWrapper = styled.div`
    button {
        font-size: 14px;
        color: grey;
        margin: 0;
        padding: 0;
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
        color: rgb(67, 56, 202);
        background-color: rgb(238, 242, 255);
        padding: 10px;
        border-radius: 6px;
    }
`;

const Nav = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Container>
            <a href="/">
                <h1>GoodGame</h1>
            </a>
            {currentUser ?
                <SignedInWrapper>
                    <p>{currentUser.email}</p>
                    <button onClick={() => app.auth().signOut()}>Sign out</button>
                </SignedInWrapper>
                :
                <SignWrapper>
                    <a href="/signin">
                        <button>Sign In</button>
                    </a>
                    <a href="/signup">
                        <button>Sign Up</button>
                    </a>
                </SignWrapper>
            }
        </Container>
    )
};

export default Nav;