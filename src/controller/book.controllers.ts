import { Request, Response } from "express";
import {z} from 'zod';
import { BookService } from "../services/books.service";
import { CreateBookDTO } from "../dtos/book.dto";
import { Book } from "../types/book.types";


let bookService: BookService = new BookService();

// export type Book = {
//     id: string;
//     title: string;
//     date?: string; //optional
// }



export class BookController {
    createBook = (req: Request, res: Response) => {
        try{    
            const validation = CreateBookDTO.safeParse(req.body);
            if(!validation.success){
                return res.status(400).json({errors: validation.error });
            }
            const{id, title} = validation.data; // same as req.body but validated

            const newBook: Book = bookService.createBook({id, title});
            return res.status(201).json(newBook);
        }catch(error: Error | any){
            return res.status(400).json({message: error.message ?? "Something went wrong"});
        }
    }

    getBooks = (req: Request, res: Response) => {
        let response: Book[] = bookService.getAllBooks();
        res.status(200).json(response);
    }

    // TASK
    getBookById = (req: Request, res: Response) => {
        const { bookid } = req.params;
        const book = bookService.getOneBook(bookid);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    }
}
