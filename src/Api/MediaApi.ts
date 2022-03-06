import axios from 'axios';

let instance=axios.create({
    baseURL:'https://dry-forest-56016.herokuapp.com',
    // withCredentials:true,
    // headers: {"Access-Control-Allow-Origin": "*"}
})


export const MediaApi={
    sendFile:(file:File)=>{
        return instance.post('/file', file);
        //return instance.post('/file', {formData:{ myFile: file}});
    },
    getFile:()=>{
        return instance.get('/file',{responseType: 'blob'})
    }
}