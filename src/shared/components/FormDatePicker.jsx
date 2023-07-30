import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import TextField from '@mui/material/TextField';

 export const FormDatePicker = ({control, name}) =>{
    const [dateValue, setDateValue] = useState(null);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller control={control} name={name} defaultValue={dateValue}
    render={({field})=>{
        
         return (<DatePicker label="Completion Date" value={dateValue} onChange={(selectedDate) => {field.onChange(selectedDate); setDateValue(selectedDate)}} 
         renderInput = {(params) =>{
            return <TextField {...params}/> 
        
        }}
        {...field.restField}
        />);
    }}
        />
        </LocalizationProvider>
    
    )
 }
