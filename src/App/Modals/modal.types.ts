import { SyntheticEvent } from "react";

import { FadeProps } from "@mui/material";
import { ModalProps as MuiModalProps } from "@mui/material/Modal/Modal";

export type BaseModalProps<Extension = unknown> = {
    isOpened?: boolean;
    onClose?(): void;
    fadeProps?: Omit<FadeProps, "in">;
} & Extension;

export type ModalComponentProps<BaseProps extends BaseModalProps = BaseModalProps> = BaseProps &
    Omit<MuiModalProps, "children" | "open" | "title">;

export type ModalHookProps<BaseProps extends BaseModalProps = BaseModalProps> = {
    isOpenedInitial?: boolean;
    onOpen?(): void;
    isDisableBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
} & Omit<BaseProps, "isOpened">;

export type ModalHookReturns<BaseProps extends BaseModalProps = BaseModalProps> = {
    openModal(): void;
    closeModal(): void;
    disableBackdrop(event: SyntheticEvent): void;
    modalProps: ModalComponentProps<BaseProps>;
};
