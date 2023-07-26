//Back-End Calls
//CRUD
import axios from "axios"
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
        const response = await axios.get(process.env.REACT_APP_NOTES_URL)
        return response.data.notes;
        }
        catch(err){
            throw err;
        }
    }, 
    insert(){
        //post
    },
    update(){
        //put
    },
    remove(){
        //delete
    }
}