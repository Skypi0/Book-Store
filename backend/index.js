import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
// Middleware for parsing request body
app.use(express.json());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Primer proyecto MERN")
});
//Ruta para guardar un nuevo libro

app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

/*funcion de escucha del puerto PORT ubicado en ./config.js*/
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

//Ruta para traer los libros de la base de datos

//conexion a mongoDBURL ubicado en ./config.js 
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('*** App connected to database ***')
    })
    .catch((error) => {
        console.log(error);
    });