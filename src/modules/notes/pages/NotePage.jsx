import { Container } from "@mui/material"
import { Header } from "../../../shared/components/Header"
import { Add } from "../components/Add"
import { List } from "../components/List"
import { useState } from "react"
import { noteOperations } from "./services/note-operation"

export const NotePage = ()=>{
    console.log('Note page call');
    const[notes, setNotes] = useState([]);
    console.log('notes are',notes);
    const collectNoteData = ()=>{
        // const notesArray = noteOperations.getNotes();
        // console.log("Array is",notesArray);
        setNotes([...noteOperations.getNotes()]);
        // setNotes(noteObject);
        // console.log('Rec data from Add',noteObject,' ');
        //setNotes(noteOperations.getNotes());
    }
    return (<Container fixed>
        <Header/>
        <Add  fn = {collectNoteData}/>
        <List notes = {notes}/>
        </Container>)
    
}