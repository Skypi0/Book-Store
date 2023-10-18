import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Ruta para guardar un nuevo libro
router.post('/', async (request, response) => {
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

//Ruta para traer todos los libros de la base de datos
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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

router.put('/:id', async (request, response) => {
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

//Ruta para eliminar un libro
router.delete('/:id', async (request, response) => {
    try {
        
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not Found'});
        }
        
        return response.status(200).send({message: 'Book Deleted Succesfully'});
    
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message})
    }
}); 

export default router;