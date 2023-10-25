import React, { FC } from "react";

import { AuthFormType } from "@utils/typings/enums/common.enums";

import Login from "@components/Auth/components/Login";
import Register from "@components/Auth/components/Register";

type AuthProps = {
    formType: AuthFormType;
};

const Auth: FC<AuthProps> = ({ formType }) => {
    switch (formType) {
        case AuthFormType.LOGIN:
            return <Login />;
        case AuthFormType.REGISTER:
            return <Register />;
    }
};

export default Auth;
