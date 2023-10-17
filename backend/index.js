import express from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express(); 

app.get('/', (request,response) => {
    console.log(request); 
    return response.status(234).send("Primer proyecto MERN")
});

/*funcion de escucha del puerto ubicado en ./config.js*/
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('*** App connected to database ***')
    })
    .catch((error) => {
        console.log(error);
    });