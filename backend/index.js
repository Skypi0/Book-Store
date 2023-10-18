import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"

const app = express();
// Middleware for parsing request body
app.use(express.json());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Primer proyecto MERN")
});

app.use('/books', booksRoute)

//conexion a mongoDBURL ubicado en ./config.js 
mongoose
    .connect(mongoDBURL)
    .then(() => {
        /*funcion de escucha del puerto PORT ubicado en ./config.js*/
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
        console.log('*** App connected to database ***')
    })
    .catch((error) => {
        console.log(error);
    });