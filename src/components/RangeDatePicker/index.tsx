import React, { FC, useMemo } from 'react';

import { mergeWithDefaultStyles } from '@/helpers';
import withRangePicker from '@/hocs/Pickers/withRangePicker';
import withCalendar from '@/hocs/withCalendar';
import { PickerProps } from '@/interfaces/pickers';

import BaseCalendar from '../BaseCalendar';

import { RangeDatePickerContainer } from './styled';

const RangeDatePicker: FC<PickerProps> = (props) => {
    const { minDate, maxDate, styles, weekStartDay, highlightWeekends, holidays, viewType } = props;

    const mergedStyles = useMemo(() => mergeWithDefaultStyles(styles), [styles]);

    const WithCalendar = useMemo(
        () =>
            withCalendar({
                Component: BaseCalendar,
                minDate,
                maxDate,
                weekStartDay,
                highlightWeekends,
                holidays,
                viewType,
            }),
        [minDate, maxDate, styles, weekStartDay, highlightWeekends],
    );

    const WithRangePicker = useMemo(
        () =>
            withRangePicker({
                Component: WithCalendar,
            }),
        [],
    );

    return (
        <RangeDatePickerContainer>
            <WithRangePicker styles={mergedStyles}/>
        </RangeDatePickerContainer>
    );
};

export default RangeDatePicker;
