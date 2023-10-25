import { BaseSyntheticEvent, useState } from "react";

import { ModalHookProps, ModalHookReturns } from "../modal.types";

export const useModal = ({
    isOpenedInitial,
    onOpen,
    onClose,
    isDisableBackdrop = false,
    closeOnBackdropClick = true,
    ...rest
}: ModalHookProps = {}): ModalHookReturns => {
    const [isOpened, setIsOpened] = useState(isOpenedInitial);

    const openModal = () => {
        setIsOpened(true);
        onOpen?.();
    };

    const closeModal = () => {
        setIsOpened(false);
        onClose?.();
    };

    const handleDisableBackdrop = (event: BaseSyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const handleBackdropClick = (event: BaseSyntheticEvent) => {
        if (isDisableBackdrop) {
            handleDisableBackdrop(event);
            return;
        }
        closeOnBackdropClick && closeModal();
    };

    return {
        openModal,
        closeModal,
        disableBackdrop: handleDisableBackdrop,
        modalProps: {
            isOpened,
            onClose: closeModal,
            slotProps: { backdrop: { onClick: handleBackdropClick } },
            ...rest
        }
    };
};
