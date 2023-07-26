import { Note } from "../../models/note"
//Service-CRUD operations
export const noteOperations ={
    notes:[],
    addNote(id,title,desc,cdate,importance){
        const noteObject = new Note(id,title,desc,cdate,importance);
        this.notes.push(noteObject);
       console.log("all notes are",this.notes);
        return noteObject;
    },
    getNotes(){
        return this.notes;
    }
}