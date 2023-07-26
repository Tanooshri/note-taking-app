import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name:'noteSlice',
    initialState:{'notes':[],'total':0},
    reducers:{
        //CRUD operations
        //Sync Operations
        //action-coming from the component
        //state-update the centralize store
         addNote(state, action){
            const noteObject = action.payload;
            console.log("add dispatch",action.payload);
            state.notes.push(noteObject);
         },
         getTotalRecord(state,action){
              state.total = state.notes.length;
         },
         removeNote(state, action){
                
         },
         searchNote(state, action){

         },
         sortNote(state, action){

         }
    },
    extraReducers:{
        //Async Operations
    }
});
export const {addNote, removeNote, searchNote,sortNote,getTotalRecord} = noteSlice.actions;
export default noteSlice.reducer;