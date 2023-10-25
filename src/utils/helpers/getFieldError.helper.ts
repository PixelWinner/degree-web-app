import get from "lodash/get";

import { FormikValues } from "formik";

type FieldErrorProps = {
    form: FormikValues;
    key: string;
};

/** The function is needed to get a boolean value
 * @param {FormikValues} form - Formik values
 * @param {string} key - Field key
 * @returns {boolean} - Boolean
 */
export const getIsFieldError = ({ form, key }: FieldErrorProps): boolean =>
    !!get(form.touched, key) && !!get(form.errors, key);

/** The function is needed to get a error value
 * @param {FormikValues} form - Formik values
 * @param {string} key - Field key
 * @returns {string | undefined} -  Error
 */
export const getFieldError = ({ form, key }: FieldErrorProps): string | undefined => {
    const isError = getIsFieldError({ form, key });

    if (!isError) {
        return undefined;
    }

    if (typeof get(form.errors, key) === "object") {
        return Object.values(get(form.errors, key))[0] as string;
    }

    return get(form.errors, key);
};
