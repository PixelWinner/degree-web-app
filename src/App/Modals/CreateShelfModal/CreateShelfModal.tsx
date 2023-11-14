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
        [Field.Name]: "",
        [Field.LENGTH]: 0,
        [Field.WIDTH]: 0,
        [Field.HEIGHT]: 0,
        [Field.MAX_WEIGHT]: 0
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
            fields={[Field.Name, Field.LENGTH, Field.WIDTH, Field.HEIGHT, Field.MAX_WEIGHT]}
        />
    );
};

export default CreateShelfModal;

const validationSchema = toFormikValidationSchema(CreateShelfDtoSchema);
