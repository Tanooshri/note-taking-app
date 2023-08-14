//Back-End Calls
//CRUD
import axios from "axios";
export const apiclient = {
    async read(){
          //get
          //promise state - pending,fulfilled,Rejected
        //   const promise = axios.get(process.env.REACT_APP_NOTES_URL);//Async
        //   console.log('Promise is',promise);
        //   promise.then(result=>{
        //       console.log('Result is',result);
        //   }).catch(err=>{
        //       console.log("Error is",err);
        //   })
        try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL);
        return response.data.notes;
        }
        catch(err){
            throw err;
        }
    }, 
    async insert(note){
        //post
        try{
            const response = await axios.post(process.env.REACT_APP_NOTES_URL, note);
            return response.data;
        }
        catch(err){
            console.log("Error in post", err);
            throw err;
        }
    },
    update(){
        //put
    },
    remove(){
        //delete
    }
};