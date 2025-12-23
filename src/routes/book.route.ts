import {Router, Request, Response} from 'express';
import { BookController } from '../controller/book.controllers';


const router: Router = Router();

const bookController = new BookController();

router.get('/', bookController.getBooks);


// TASk
// make a router that handles GET request that takes bookid
// /:bookid and calls bookController.getById
// router.get('/:bookid', bookController.getBookById);

router.get('/:bookid', bookController.getBookById);

export default router;