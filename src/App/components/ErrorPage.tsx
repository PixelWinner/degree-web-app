import React, { FC } from "react";
import { SerializedError } from "@reduxjs/toolkit";

export type ErrorPageProps = {
    error?: Error | SerializedError;
};
const ErrorPage:FC<ErrorPageProps> = ({error}) => {
    return (
        <div>
            {error?.message ?? JSON.stringify(error)}
        </div>
    );
};

export default ErrorPage;