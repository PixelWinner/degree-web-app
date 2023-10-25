import React, { MouseEvent, useCallback, useState } from "react";

import styled from "styled-components/macro";

import { Avatar, CircularProgress } from "@mui/material";

import { userDataApi } from "@store/apis/userData.api";
import { selectIsAuthenticated } from "@store/slices/auth/auth.selectors";
import { selectUserData } from "@store/slices/userData/userData.selectors";
import { useAppSelector } from "@store/store.hooks";

import ProfileMenu from "@components/AppHeader/components/ProfileMenu";

const UserIcon = styled(Avatar)`
    cursor: pointer;
    justify-self: flex-end;
`;

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const { isLoading } = userDataApi.useGetUserDataQuery(undefined, { skip: !isAuthenticated });
    const userData = useAppSelector(selectUserData);

    const handleOpen = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            <UserIcon onClick={handleOpen}>{userData?.name?.[0]}</UserIcon>
            <ProfileMenu isAuthenticated={isAuthenticated} userName={userData?.name} anchorEl={anchorEl} handleClose={handleClose} />
        </>
    );
};

export default Profile;
