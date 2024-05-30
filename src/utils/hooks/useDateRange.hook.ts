import { subMonths } from "date-fns";
import { DateRange as MuiDateRange } from "@mui/x-date-pickers-pro";
import { useCallback, useMemo, useState } from "react";

const START_DATE = subMonths(new Date(), 3);

const END_DATE = new Date();

const INITIAL_RANGE: MuiDateRange<Date> = [START_DATE, END_DATE];

type DateRange = { startDate: string, endDate: string };

type UseDateRangeReturns = {
    dateRange: DateRange
    handleChange: (newRange: MuiDateRange<Date>) => void,
    value: MuiDateRange<Date>
}

type UseDateRangeHook = (initialRange?: MuiDateRange<Date>) => UseDateRangeReturns

export const useDateRange: UseDateRangeHook = (initialRange) => {
    const [range, setRange] = useState<MuiDateRange<Date>>(initialRange ?? INITIAL_RANGE);

    const dateRange = useMemo(() => (
        {
            startDate: range[0]?.toISOString() as string,
            endDate: range[1]?.toISOString() as string
        }), [range]);

    const handleChange = useCallback((newRange: MuiDateRange<Date>) => {
        setRange(newRange);
    }, []);

    return {
        dateRange,
        value: range,
        handleChange
    };
};