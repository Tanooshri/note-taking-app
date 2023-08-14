import { Box, FormControl } from "@mui/material"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import { useRef, useState} from "react";
//import { noteOperations } from "../pages/services/note-operation";
import dayjs from 'dayjs';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { MuiColorInput } from 'mui-color-input'
import { useDispatch } from "react-redux";
import { addNote, insertNotes } from "../redux/note-slice";
// import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import './Add.css';
//import { formState } from "react-hook-form";
import { FormDatePicker } from "../../../shared/components/FormDatePicker";
//import { FormDatePicker } from "../../../shared/components/FormDatePicker";
import { Note } from "../models/note";
 


export const Add = ()=>{
  const {control, register, handleSubmit, formState:{errors}}=useForm();
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
    const noteObject = new Note(
      data.idValue,
      data.titleValue,
      data.descValue,
      data.dateValue,
      data.colorValue
    );
    dispatch(insertNotes(noteObject));
  };
  const action = (<>
  <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      </>
  );
  
  const takeNote =()=>{
        const idValue = id.current.value;
        const titleValue = title.current.value;
        const descValue = desc.current.value;
        const date =  dateValue ? dayjs(dateValue).format('MM/DD/YYYY') : ''; 
        console.log('Id',idValue);
        console.log('Title',titleValue);
        console.log('desc',descValue);
        console.log('now date is ',date);
        console.log('color',colorValue);
        //put the data in an object(Object literal)
        //const noteObject = {'id':idValue,'title':titleValue,'desc':descValue};
        // const noteObject = noteOperations.addNote(idValue,titleValue,descValue,'','')
        //noteOperations.addNote(idValue,titleValue,descValue,date,colorValue)
        // props.fn();  
        // const noteObject = {idValue,titleValue,descValue,date,colorValue};
        const noteObject = new Note(
          idValue,
          titleValue,
          descValue,
          date,
          colorValue
        );
        dispatch(addNote(noteObject));
        setOpen(true);
        // setMessage('Record Added...');
        // setTimeout(() => {
        //   setMessage('')
        // }, 2000);
    }
    return (<>
      <Box sx={{
        margin:5,flexDirection:'column',display:'flex'
      }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        {...register('title', {required:true, minLength:3, pattern:/^[a-z]{3,10}/})}
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
      {errors.title && errors.title.type=='required' && (<p className='errorMsg'> Title is required</p>)}
      {errors.title && errors.title.type=='minLength' && (<p className='errorMsg'>Min length should be gte 3</p>)}
      
         
      <TextField
        id="note-desc"
        {...register('desc',{validate:{
          checkLength:(value)=>value.length>=6
        }})}
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
      {errors.desc?.type ==='checkLength' && (<p>Min length for desc is 6</p>)}
      
      
      <FormDatePicker name="dateValue" {...register('dateValue')} control={control}/>
       
      <MuiColorInput  {...register('color')} value={colorValue} onChange={(selectedColor)=>setColorValue(selectedColor)} />
      <Button type='submit' variant="contained">Add</Button>
      </FormControl>
      </form>
      </Box>
      </>
    )
}