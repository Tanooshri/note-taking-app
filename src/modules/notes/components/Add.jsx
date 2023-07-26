import { Box, FormControl, Typography } from "@mui/material"
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
// import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { formState } from "react-hook-form";
//import { FormDatePicker } from "../../../shared/components/FormDatePicker";


export const Add = ()=>{
  const {register, handleSubmit, formState:{error}}=useForm();
  const id = useRef();
  const title = useRef();
  const desc = useRef();
  const [dateValue, setDateValue] = useState(null);
  const [colorValue, setColorValue] = useState('#ffffff');
  // const[message,setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch(); 
  const handleClose = ()=>setOpen(false); 
  const onSubmit = (data)=>{
    console.log('Data is',data);
  }
  const action = <>
  <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton></>
  
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
        // setMessage('Record Added...');
        // setTimeout(() => {
        //   setMessage('')
        // }, 2000);
        setOpen(true);

    }
    return (<>
      <Box sx={{
        margin:5,flexDirection:'column',display:'flex'
      }}>
        <form onsubmit={handleSubmit(onsubmit)}>
          <FormControl>
        {/* <Typography>
          {message}
        </Typography> */}
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note Added"
        action={action}
      />
        <TextField
        id="note id"
        {...register('id')}
        //inputRef = 
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
        {...register('title')}
        // inputRef = {title}
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
        {...register('desc')}
        // inputRef={desc}
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
    {/* <FormDatePicker name = "date" {...register('date')} control = {control}/> */}
       
      <MuiColorInput  value={colorValue} onChange={(selectedColor)=>setColorValue(selectedColor)} />
      <Button type='submit' variant="contained">Add</Button>
      </FormControl>
      </form>
      </Box>
      </>
    )
}