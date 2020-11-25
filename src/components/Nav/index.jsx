import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(229, 231, 235);

    h1:first-child {
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
    }

    button {
        font-size: 16px;
    }
`;

const SignWrapper = styled.div`
    display: flex;
    align-items: center;

    button:first-child {
        margin: 0 10px 0 0;
        color: rgb(107, 114, 128);
    }

    button:nth-child(2) {
        font-weight: 700;
        color: rgb(67, 56, 202);
        background-color: rgb(238, 242, 255);
        padding: 10px;
        border-radius: 6px;
    }
`;

const Nav = () => (
    <Container>
        <h1>GoodGame</h1>
        <SignWrapper>
            <button>Sign In</button>
            <button>Sign Up</button>
        </SignWrapper>
    </Container>
);

export default Nav;