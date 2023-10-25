import React, { FC } from "react";

import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonProps = {
    isLoading?: boolean;
} & MuiButtonProps;

const Button: FC<ButtonProps> = (props) => {
    const { isLoading, disabled, children, ...rest } = props;

    return (
        <MuiButton startIcon={isLoading && <CircularProgress size={16} />} variant="contained" disabled={isLoading ?? disabled} {...rest}>
            {children}
        </MuiButton>
    );
};

export default Button;
