import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import dayjs from 'dayjs';
import 'dayjs/locale/pt';

const DatePickerInput = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        minDate={dayjs()}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
