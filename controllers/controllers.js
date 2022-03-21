const express = require('express');
const app = express()

const deleteMSG = async (req,res)=>{
    let id = req.params.id;
    let room = req.params.room
       try{
       await  removeItem(arr, refId) {
        return arr.filter(function(i) { return i.id !== refId; });
    };
       res.send(id);

       }catch(error){
         res.status(404).send(error);
       }
}
module.exports= {deleteMSG}