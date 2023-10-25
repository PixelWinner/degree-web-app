import React, { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import styled from "styled-components/macro";

const StyledLink = styled(NavLink)`
    color: ${({ theme }) => theme.palette.primary.main};
`;
export const Link: FC<NavLinkProps> = (props) => {
    const { children, ...rest } = props;
    return <StyledLink {...rest}>{children}</StyledLink>;
};
