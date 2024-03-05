import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query";
import { BaseQueryFn, FetchArgs, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import debounce from "lodash/debounce";
import omit from "lodash/omit";

import SearchIcon from "@mui/icons-material/Search";
import { TextFieldProps } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { MS_IN_SECOND } from "@utils/constants/common.constants";
import { ProvidedTag } from "@utils/typings/enums/api.enums";
import { Request } from "@utils/typings/enums/common.enums";
import { ApiError } from "@utils/typings/types/api.types";

import TextField from "@components/TextField";

const DEBOUNCE_TIME = 0.5 * MS_IN_SECOND;

type TQueryDefinition = QueryDefinition<
    // eslint-disable-next-line
    any,
    BaseQueryFn<
        FetchArgs,
        unknown,
        {
            status: number;
            data: unknown;
        } & ApiError,
        void | Record<string, unknown>,
        FetchBaseQueryMeta
    >,
    ProvidedTag,
    // eslint-disable-next-line
    any,
    "api"
>;

type RefRequestType = QueryActionCreatorResult<TQueryDefinition> | null;

type QueryProps = {
    requestType: Request.QUERY;
    refetch: () => QueryActionCreatorResult<TQueryDefinition>;
};

type MutationProps = {
    requestType: Request.MUTATION;
    queryTrigger: LazyQueryTrigger<TQueryDefinition>;
};

type RestProps = Omit<TextFieldProps, "onChange"> & (MutationProps | QueryProps);

type SearchFieldProps = {
    labelTranslationKey: string;
    onChange?: (newValue: string) => void;
    initialValue?: string;
    requestType: Request;
} & RestProps;

const SearchField: FC<SearchFieldProps> = ({ labelTranslationKey, initialValue, onChange, ...rest }) => {
    const [value, setValue] = useState<string>(initialValue ?? "");
    const { t } = useTranslation();
    const refRequest = useRef<RefRequestType>(null);

    const isMutation = rest.requestType === Request.MUTATION;
    const request = isMutation ? rest.queryTrigger : rest.refetch;

    const abortCurrentRequest = () => refRequest.current?.abort();

    useEffect(() => {
        if (!isMutation) {
            return;
        }

        handleRequest(value);
    }, []);

    //Using only for a mutations
    const handleRequest = useCallback(
        (argValue: string) => {
            if (!isMutation) {
                return;
            }

            abortCurrentRequest();

            if (argValue && request) {
                refRequest.current = request(argValue);
            }
        },
        [request]
    );

    //Using only for a mutations
    const debouncedRequest = useCallback(debounce(handleRequest, DEBOUNCE_TIME), [handleRequest]);

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;

            setValue((prevValue) => {
                if (isMutation) {
                    request(prevValue).abort();
                }

                return newValue;
            });

            onChange?.(newValue);

            if (newValue.trim() && isMutation) {
                debouncedRequest(newValue);
            }
        },
        [request, debouncedRequest]
    );

    return (
        <TextField
            name={t(labelTranslationKey)}
            label={t(labelTranslationKey)}
            value={value}
            type="text"
            placeholder={t("general.enterNameForSearch")}
            onChange={handleChange}
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
            margin="none"
            {...omit(rest, ["requestType", "queryTrigger", "refetch"])}
        />
    );
};

export default SearchField;
