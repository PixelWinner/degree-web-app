import React, { FC } from "react";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { shelvesApi } from "@store/apis/shelves.api";

import { Field } from "@utils/typings/enums/common.enums";
import { CreateShelfDtoSchema } from "@utils/typings/schemas/shelves/shelves.schemas";
import { CreateShelfDto } from "@utils/typings/types/shelves/shelves.types";

import CreateModal from "../CreateModal/CreateModal";
import { ModalHookReturns } from "../modal.types";

type CreateShelfModalProps = {
    modalHook: ModalHookReturns;
    storageId: number;
};

const CreateShelfModal: FC<CreateShelfModalProps> = ({ modalHook, storageId }) => {
    const initialValues: CreateShelfDto = {
        storageId,
        [Field.Name]: ""
    };

    const [createShelf, { isLoading }] = shelvesApi.useCreateShelfMutation();

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, formikHelpers) => {
            await createShelf(values).unwrap();
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
            titleTranslationKey="modal.createShelf.title"
            descriptionTranslationKey="modal.createShelf.description"
            formikHook={formikHook}
            isLoading={isLoading}
            fields={[Field.Name]}
        />
    );
};

export default CreateShelfModal;

const validationSchema = toFormikValidationSchema(CreateShelfDtoSchema);
