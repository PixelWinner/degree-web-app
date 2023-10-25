import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { PAGE_PATH } from "@utils/constants/common.constants";

import Button from "@components/Button";

type BackButtonProps = {
    path?: (typeof PAGE_PATH)[keyof typeof PAGE_PATH];
};

const BackButton: FC<BackButtonProps> = ({ path }) => {
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
        <Button onClick={handleClick} variant="outlined">
            {t("general.back")}
        </Button>
    );
};

export default BackButton;
