import React from 'react';
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('ja', ja);

export const DefaultDatePicker: React.FC<ReactDatePickerProps> = (props) => {
  return (
    <DatePicker
      className="p-1 shadow-md rounded-md border-2 border-gray-100"
      locale="ja"
      showTimeSelect
      isClearable
      {...props}
    />
  );
};
