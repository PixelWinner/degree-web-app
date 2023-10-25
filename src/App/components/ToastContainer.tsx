import React, { CSSProperties, FC, RefAttributes } from "react";
import { ToastContainer as ReactToastContainer, ToastContainerProps as ReactToastContainerProps, toast } from "react-toastify";

import { useThemeContext } from "@utils/providers/ThemeProvider";

type ToastContainerProps = ReactToastContainerProps & RefAttributes<HTMLDivElement>;

export const ToastContainer: FC<ToastContainerProps> = (props) => {
    const { theme } = useThemeContext();

    const toastStyles: CSSProperties = { backgroundColor: theme.palette.background.paper };

    return <ReactToastContainer position={toast.POSITION.TOP_RIGHT} toastStyle={toastStyles} theme={theme.palette.mode} {...props} />;
};
