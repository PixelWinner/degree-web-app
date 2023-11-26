import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ButtonProps } from "@mui/material";

import { PAGE_PATH } from "@utils/constants/common.constants";

import Button from "@components/Button";

type BackButtonProps = {
    path?: (typeof PAGE_PATH)[keyof typeof PAGE_PATH];
    size?: ButtonProps["size"];
};

const BackButton: FC<BackButtonProps> = ({ path, size = "small" }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleClick = () => {
        if (!path) {
            navigate(-1);
            return;
        }

        navigate(path);
    };

    return (
        <Button size={size} onClick={handleClick} variant="outlined">
            {t("general.back")}
        </Button>
    );
};

export default BackButton;
