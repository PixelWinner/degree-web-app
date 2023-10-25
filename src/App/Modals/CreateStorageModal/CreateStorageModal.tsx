import React, { FC } from "react";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { storagesApi } from "@store/apis/storages.api";

import { Field } from "@utils/typings/enums/common.enums";
import { CreateStorageDtoSchema } from "@utils/typings/schemas/storage/storage.schemas";
import { CreateStorageDto } from "@utils/typings/types/storages/storages.types";

import CreateModal from "../CreateModal/CreateModal";
import { ModalHookReturns } from "../modal.types";

type CreateStorageModalProps = {
    modalHook: ModalHookReturns;
};

const CreateStorageModal: FC<CreateStorageModalProps> = ({ modalHook }) => {
    const initialValues: CreateStorageDto = {
        [Field.Name]: ""
    };

    const [createStorage, { isLoading }] = storagesApi.useCreateStorageMutation();

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, formikHelpers) => {
            await createStorage(values).unwrap();
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
            titleTranslationKey="modal.createStorage.title"
            descriptionTranslationKey="modal.createStorage.description"
            formikHook={formikHook}
            isLoading={isLoading}
            fields={[Field.Name]}
        />
    );
};

export default CreateStorageModal;

const validationSchema = toFormikValidationSchema(CreateStorageDtoSchema);
