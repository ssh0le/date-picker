import RangeDatePicker from '@/components/RangeDatePicker';

import '@testing-library/jest-dom';
import { testInput } from './helpers/testDateInput';
import { testPicker } from './helpers/testPicker';

const initialDate = new Date(2023, 8, 10);
const datePickerId = 'date-picker';
const titleId = 'title';
const inputId = `input-To`;
const applyButtonId = `input-apply-To`;
const clearButtonId = `input-clear-To`;

describe('Range Date picker', () => {
  testPicker(RangeDatePicker, datePickerId);

  describe('Date input', () => {
    testInput(
      RangeDatePicker,
      initialDate,
      inputId,
      titleId,
      clearButtonId,
      applyButtonId,
    );
  });
});
