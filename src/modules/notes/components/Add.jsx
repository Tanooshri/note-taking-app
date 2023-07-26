import { Box } from "@mui/material"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import { useRef, useState} from "react";
import { noteOperations } from "../pages/services/note-operation";
import dayjs from 'dayjs';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiColorInput } from 'mui-color-input'
import { useDispatch } from "react-redux";
import { addNote } from "../redux/note-slice";

export const Add = ()=>{
  const id = useRef();
  const title = useRef();
  const desc = useRef();
  const [dateValue, setDateValue] = useState(null);
  const [colorValue, setColorValue] = useState('#ffffff');
  const dispatch = useDispatch();  
  const takeNote =()=>{
        const idValue = id.current.value;
        const titleValue = title.current.value;
        const descValue = desc.current.value;
        const date =  dateValue ? dayjs(dateValue).format('MM/DD/YYYY') : ''; 
        console.log('Id',idValue);
        console.log('Title',titleValue);
        console.log('desc',descValue);
        console.log('dateValue',date);
        console.log('color',colorValue);
        //put the data in an object(Object literal)
        //const noteObject = {'id':idValue,'title':titleValue,'desc':descValue};
        // const noteObject = noteOperations.addNote(idValue,titleValue,descValue,'','')
        //noteOperations.addNote(idValue,titleValue,descValue,date,colorValue)
        // props.fn();  
        const noteObject = {idValue,titleValue,descValue,date,colorValue};
        dispatch(addNote(noteObject));
    }
    return (<>
      <Box sx={{
        margin:5,flexDirection:'column',display:'flex'
      }}>
        <TextField
        id="note id"
        inputRef = {id}
        label="Enter Id"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NoteAddIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="note-title"
        inputRef = {title}
        label="Title"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="note-desc"
        inputRef={desc}
        label="description"
        multiline
        maxRows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DatePicker value={dateValue} onChange={(selectedDate) => setDateValue(selectedDate)} />
    </LocalizationProvider>

      <MuiColorInput value={colorValue} onChange={(selectedColor)=>setColorValue(selectedColor)} />
      <Button onClick={takeNote} variant="contained">Add</Button>
      </Box>
      </>
    )
}