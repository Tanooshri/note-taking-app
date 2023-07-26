import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import { noteOperations } from '../pages/services/note-operation';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalRecord, sortNote } from '../redux/note-slice';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { searchNote} from '../redux/note-slice';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { apiclient } from '../../../shared/services/api-client';
import { fetchNotes } from '../redux/note-slice';




export const List = ()=>{
  const [sort,setSort] = useState();
    //console.log("Props are",props.notes)
    const dispatch = useDispatch();
    const takeSearchValue = (event)=>{
        const searchValue =  event.target.value;
        const searchData = {search:searchValue};
        dispatch(searchNote(searchData));
    }
    const sortIt =(event)=>{
      const sortBy = event.target.value;
      setSort(sortBy);
      dispatch(sortNote(sortBy));
    }
    const noteObject = useSelector((state)=>{
      //console.log("......State is",state)
      return {'notes':state.noteSlice.notes,'total':state.noteSlice.total,'results':state.noteSlice['search-result'],'isLoading':state.noteSlice.isLoading};
    });//pull
    //Component(HTML PAGE) Mount
    //Life cycle Methods(Hook)
    
    useEffect(()=>{
      //Component Mount
      dispatch(getTotalRecord()); //push
      dispatch(fetchNotes())
      // const promise = apiclient.read();
      // promise.then(result=>{
      //         console.log('Result is::::::',result);
      //     }).catch(err=>{
      //         console.log("Error is",err);
      //     })
    },[]);
    return (<div>
      <h1>Total Records {noteObject.total}</h1>
      Loading {noteObject.isLoading}
      <TextField onChange={takeSearchValue} label="Search by Title" variant="outlined" />
        {/* <h1>{props.note.id} {props.note.title} {props.note.desc}</h1>  */}
        <br />
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={sortIt}
        >
          <MenuItem value="idValue">By Id</MenuItem>
          <MenuItem value="titleValue">By Title</MenuItem>
          <MenuItem value="descValue">By Desc</MenuItem>
        </Select>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">CompletionDate</TableCell>
            <TableCell align="right">Importance</TableCell>
            <TableCell align="right">Operations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noteObject.results.length>0 && noteObject.results.map(note=>{
            return  (<TableRow>
              {console.log(note)}
                  <TableCell align="right">{note.idValue}</TableCell>
                  <TableCell align="left">{note.titleValue}</TableCell>
                  <TableCell align="left">{note.descValue}</TableCell>
                  <TableCell align="right">{note.date}</TableCell>
                  <TableCell align="right">{note.colorValue}</TableCell>
                  <TableCell align="right"><DeleteIcon/><EditIcon/></TableCell>
              </TableRow>);
          })}
            {noteObject.results.length ==0 && noteObject.notes.map(note=>{
               return  (<TableRow>
                {console.log(note)}
                    <TableCell align="right">{note.idValue}</TableCell>
                    <TableCell align="left">{note.titleValue}</TableCell>
                    <TableCell align="left">{note.descValue}</TableCell>
                    <TableCell align="right">{note.date}</TableCell>
                    <TableCell align="right">{note.colorValue}</TableCell>
                    <TableCell align="right"><DeleteIcon/><EditIcon/></TableCell>
                </TableRow>);
            })}
        </TableBody>
        </Table>
        </TableContainer>
    </div>
    )
}