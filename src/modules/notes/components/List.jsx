import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { noteOperations } from '../pages/services/note-operation';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalRecord } from '../redux/note-slice';
import { useEffect } from 'react';


export const List = ()=>{
    //console.log("Props are",props.notes)
    const dispatch = useDispatch();
    const noteObject = useSelector(state=>{
      return {'notes':state.notes,'total':state.total};
    });//pull
    //Component(HTML PAGE) Mount
    //Life cycle Methods(Hook)
    useEffect(()=>{
      //Component Mount
      dispatch(getTotalRecord()); //push
    },[]);
    return (<div>
      <h1>Total Records {noteObject.total}</h1>
        {/* <h1>{props.note.id} {props.note.title} {props.note.desc}</h1>  */}
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
            {noteOperations.getNotes().map(note=>{
               return  (<TableRow>
                    <TableCell align="right">{note.id}</TableCell>
                    <TableCell align="left">{note.title}</TableCell>
                    <TableCell align="left">{note.desc}</TableCell>
                    <TableCell align="right">{note.cdate}</TableCell>
                    <TableCell align="right">{note.importance}</TableCell>
                    <TableCell align="right"><DeleteIcon/><EditIcon/></TableCell>
                </TableRow>);
            })}
        </TableBody>
        </Table>
        </TableContainer>
    </div>
    )
}