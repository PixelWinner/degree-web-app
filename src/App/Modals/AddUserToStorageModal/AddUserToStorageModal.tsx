import React, { FC } from "react";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { storagesApi } from "@store/apis/storages.api";

import { Field } from "@utils/typings/enums/common.enums";
import { AddUserToStorageDtoSchema } from "@utils/typings/schemas/storage/storage.schemas";

import CreateModal from "../CreateModal/CreateModal";
import { ModalHookReturns } from "../modal.types";

type AddUserToStorageModalProps = {
    modalHook: ModalHookReturns;
    storageId: number;
};

const AddUserToStorageModal: FC<AddUserToStorageModalProps> = ({ modalHook, storageId }) => {
    const initialValues = {
        storageId,
        [Field.EMAIL]: ""
    };

    const [addUser, { isLoading }] = storagesApi.useAddUserToStorageMutation();

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, formikHelpers) => {
            await addUser(values).unwrap();
            formikHelpers.resetForm();
            modalHook.closeModal();
        },
        onReset: () => {
            modalHook.closeModal();
        }
    });

    return (
        <CreateModal
            modalHook={modalHook}
            fields={[Field.EMAIL]}
            formikHook={formikHook}
            isLoading={isLoading}
            titleTranslationKey="modal.addUserToStorage.title"
            descriptionTranslationKey="modal.addUserToStorage.description"
        />
    );
};

export default AddUserToStorageModal;

const validationSchema = toFormikValidationSchema(AddUserToStorageDtoSchema);
