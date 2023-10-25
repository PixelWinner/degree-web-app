import React, { FC } from "react";

import { Backdrop, CircularProgress } from "@mui/material";

type BackdropLoaderProps = {
    isLoading: boolean;
};

const BackdropLoader: FC<BackdropLoaderProps> = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <Backdrop open={isLoading}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default BackdropLoader;
