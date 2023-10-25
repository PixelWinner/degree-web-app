import React, { FC } from "react";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

const TextField: FC<TextFieldProps> = (props) => {
    return <MuiTextField margin="normal" {...props} />;
};

export default TextField;
