import React, { useState } from 'react';
import classNames from 'classnames';
import { FormLabel } from './FormLabel';
import { FormHint } from './FormHint';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';

export const FormDatePicker = ({
  className,
  children,
  label,
  labelHidden,
  type,
  name,
  status,
  disabled,
  value,
  formGroup,
  hasIcon,
  size,
  placeholder,
  hint,
  register,
  required,
  onChange,
  format = 'DD/MM/YYYY',
  minDate,
  showToday=false,
  showDateInput=false,
  ...props
}) => {
  // NOTE : STATE
  const [selectedDate, setSelectedDate] = useState(null);
  let minDataDisabled = minDate ? moment(minDate) : null; 
  // NOTE : ClassName
  const wrapperClasses = classNames(
    (formGroup ? `form-group-${formGroup}` : `form-group`),
    (hasIcon && hasIcon !== '') && 'has-icon-' + hasIcon
  );

  const classes = classNames(
    'form-input',
    size && `form-input-${size}`,
    status && `form-${status}`,
    className
  );
  // NOTE : FUNCTION
  const handleDateChange = (value) => {
    setSelectedDate(value);
    onChange(value);
  }
  const disabledDate = (current) => {
    return current && current < minDataDisabled?.startOf('day');
  };

  const calendar = (
    <Calendar
      showDateInput={showDateInput}
      showToday={showToday}
      onChange={handleDateChange}
      value={selectedDate}
      disabledDate={disabledDate} // Set the disabledDate function
    />
  );

  // NOTE : RN
  return (
    <>
      {label && <FormLabel labelHidden={labelHidden} id={props.id}>{label}</FormLabel>}
      <div
        className={wrapperClasses}
      >
        <DatePicker
          animation="slide-up"
          calendar={calendar}
          value={selectedDate}
        >
          {({ value }) => (
            <input
              {...register(name, { required })}
              type='text'
              readOnly
              className={classes}
              value={value ? value.format(format) : ''}
              placeholder={placeholder}
              autoComplete='off'
            />
          )}
        </DatePicker>

        {children}
      </div>
      {hint && <FormHint status={status}>{hint}</FormHint>}
    </>
  );
}
