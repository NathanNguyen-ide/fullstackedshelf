import express, { application } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

// parsing request body, handles json data sent in http requests
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Bookstore')
})

// define middleware routing to /books
app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
