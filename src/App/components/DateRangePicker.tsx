import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { DateRange, LocalizationProvider, SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import { DateRangePicker as MuiDateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useDateFnsLocale } from "@utils/hooks/useDateFnsLocale.hook";

type DateRangePickerProps = {
    value: DateRange<Date>;
    onChange: (range: DateRange<Date>) => void;
};

const DateRangePicker: FC<DateRangePickerProps> = ({ value, onChange }) => {
    const { t } = useTranslation();
    const locale = useDateFnsLocale();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
            <MuiDateRangePicker
                slots={{ field: SingleInputDateRangeField }}
                autoFocus={false}
                value={value}
                onChange={onChange}
                label={t("general.dateRange")}
            />
        </LocalizationProvider>
    );
};

export default DateRangePicker;
