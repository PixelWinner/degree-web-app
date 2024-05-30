import { FormikValues, useFormik } from "formik";
import { CreateShipmentDto, CreateShipmentForm } from "@utils/typings/types/shipments/shipments.types";
import { Field } from "@utils/typings/enums/common.enums";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CreateShipmentFormSchema } from "@utils/typings/schemas/shipments/shipments.schemas";
import { shipmentsApi } from "@store/apis/shipments.api";

type UseShipmentFormReturns = {
    formikHook: FormikValues
}

type UseShipmentFormHook = () => UseShipmentFormReturns

export const useShipmentForm: UseShipmentFormHook = () => {
    const [createShipment] = shipmentsApi.useCreateShipmentMutation();

    const initialValues: CreateShipmentForm = {
        [Field.Name]: "",
        [Field.SURNAME]: "",
        [Field.PATRONYMIC]: "",
        [Field.EMAIL]: "",
        [Field.PHONE_NUMBER]: "",
        [Field.ADDRESS]: "",
        products: []
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const products = values.products.map((product) => ({ amount: product.shippedAmount, productId: product.id }));

            const createShipmentDto: CreateShipmentDto = { ...values, products };

            await createShipment(createShipmentDto).unwrap();
        }
    });

    return {
        formikHook
    };
};

const validationSchema = toFormikValidationSchema(CreateShipmentFormSchema);