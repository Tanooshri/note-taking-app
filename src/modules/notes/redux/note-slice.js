import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiclient } from "../../../shared/services/api-client";

export const fetchNotes = createAsyncThunk('notes/fetch',async()=>{
 try{
  const response = await apiclient.read(); //HTTP Call
  return response;
 }
 catch(err){
    throw err;
 } 
});
export const insertNotes = createAsyncThunk(
    "notes/insertNotes",
    async (note) => {
      console.log("THe extra is called", note);
      try {
        const response = await apiclient.insert(note);
        return response;
      } catch (err) {
        console.log("Err is ::: ", err);
        throw err;
      }
    }
  );


const noteSlice = createSlice({
    name:'noteSlice',
    initialState:{notes:[],
      total:0,
      "search-result":[],
       isLoading:false,
       err: null,
      },

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
              const searchObj = action.payload;
              console.log('Search Obj',searchObj);
              state['search-result'] = state.notes.filter(note=>note.titleValue.includes(searchObj.search))
         },
         sortNote(state, action){
                const sortObject = action.payload;
                const key = sortObject.sortBy;
                state.notes.sort((first, second)=>{
                    if(key =='id'){
                        return first[key] - second[key];
                    }
                    else {
                        return first[key].localeCompare(second[key]);
                    }
                })
            }
        },
    extraReducers:(builder)=>{
        builder.addCase(fetchNotes.pending,(state,action)=>{
            state.isLoading = true;
            console.log('Pending....',action.payload);
        })
        .addCase(fetchNotes.fulfilled, (state, action)=>{
            console.log('fulfilled....',action.payload);
            state.isLoading = false;
            state.notes = action.payload;
            
        })
        .addCase(fetchNotes.rejected,(state,action)=>{
            console.log('Rejected...',action.payload);
            state.isLoading = false;
            state.notes = [];
            state.err = action.payload;
        })
        .addCase(insertNotes.fulfilled, (state, action) => {
            const updatedNote = action.payload;
            state.isLoading = false;
            state.err = null;
          })
          .addCase(insertNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          })
          .addCase(insertNotes.pending, (state) => {
            state.isLoading = true;
            state.err = null;
          });
        //Async Operations
    },
});
export const {addNote, removeNote, searchNote,sortNote,getTotalRecord} = noteSlice.actions;
export default noteSlice.reducer;