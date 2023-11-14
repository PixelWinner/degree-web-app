import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components/macro";

import AppHeader from "@components/AppHeader/AppHeader";
import { ToastContainer } from "@components/ToastContainer";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${({ theme }) => theme.palette.background.default};
`;

const AppLayout = () => {
    return (
        <Container>
            <AppHeader />
            <Outlet />
            <ToastContainer />
        </Container>
    );
};

export default AppLayout;
