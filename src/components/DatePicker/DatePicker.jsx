import React from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './DatePicker.module.css';

var formatDate = require('../../utils.js').formatDate;

const DatePicker = ({ dates, handleDateChange }) => {
  return (
      <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="" classes={{root: styles.formPadding}} onChange={(e) => handleDateChange(e.target.value)}>
            {dates ? dates.map((date, i) => <option key={i} value={formatDate(date)}> {formatDate(date)}</option>) : ""}
        </NativeSelect>
      </FormControl>
  )
}

export default DatePicker;