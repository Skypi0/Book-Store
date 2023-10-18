import express, { request, response } from "express";
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
        response.status(500).send({ message: error.message });
    }
});

/*funcion de escucha del puerto PORT ubicado en ./config.js*/
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

//Ruta para traer todos los libros de la base de datos
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).send({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//Ruta para traer todos los libros de la base de datos por Id
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Ruta para actualizar un libro con mongoose 

app.put('/books/:id', async (request, response) => {
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
        
        const { id } = request.params;
        
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not Found'});
        }

        return response.status(200).send({message: 'Book Updated Succesfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//ruta para eliminar un libro
app.delete('/books/:id', async (request, response) => {
    try {
        
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not Found'});
        }
        
        return response.status(200).send({message: 'Book Deleted Succesfully'});
    
    } catch (error) {
        console.log(error.message);
        return reponse.status(500).send({message: error.message})
    }
});

//conexion a mongoDBURL ubicado en ./config.js 
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('*** App connected to database ***')
    })
    .catch((error) => {
        console.log(error);
    });