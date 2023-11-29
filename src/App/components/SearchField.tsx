import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query";
import { BaseQueryFn, FetchArgs, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import debounce from "lodash/debounce";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { MS_IN_SECOND } from "@utils/constants/common.constants";
import { ProvidedTag } from "@utils/typings/enums/api.enums";
import { ApiError } from "@utils/typings/types/api.types";

import TextField from "@components/TextField";

const DEBOUNCE_TIME = 0.5 * MS_IN_SECOND;

type TQueryDefinition = QueryDefinition<
    string,
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

type SearchFieldProps = {
    labelTranslationKey: string;
    onChange?: (newValue: string) => void;
    initialValue?: string;
    queryTrigger: LazyQueryTrigger<TQueryDefinition>;
};

const SearchField: FC<SearchFieldProps> = ({ labelTranslationKey, initialValue, onChange, queryTrigger }) => {
    const [value, setValue] = useState<string>(initialValue ?? "");
    const { t } = useTranslation();

    const refRequest = useRef<RefRequestType>(null);

    const abortCurrentRequest = () => refRequest.current?.abort();

    const handleRequest = (argValue: string) => {
        abortCurrentRequest();

        if (argValue) {
            refRequest.current = queryTrigger(argValue);
        }
    };

    useEffect(() => {
        handleRequest(value);
    }, []);

    const debouncedRequest = useCallback(debounce(handleRequest, DEBOUNCE_TIME), []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setValue((prevValue) => {
            queryTrigger(prevValue).abort();
            return newValue;
        });

        onChange?.(newValue);

        if (newValue.trim()) {
            debouncedRequest(newValue);
        }
    };

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
        />
    );
};

export default SearchField;
