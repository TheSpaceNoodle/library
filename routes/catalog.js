import { Router } from 'express';
import * as author_controller from '../controllers/authorController.js';
import * as book_controller from '../controllers/bookController.js';
import * as book_instance_controller from '../controllers/bookInstanceController.js';
import * as genre_controller from '../controllers/genreController.js';

const router = Router();

router.get('/', book_controller.index);
router.get('/book/create', book_controller.book_create_get);
router.post('/book/create', book_controller.book_create_post);
router.get('/book/:id/delete', book_controller.book_delete_get);
router.post('/book/:id/delete', book_controller.book_delete_post);
router.get('/book/:id/update', book_controller.book_update_get);
router.post('/book/:id/update', book_controller.book_update_post);
router.get('/book/:id', book_controller.book_detail);
router.get('/books', book_controller.book_list);

router.get('/author/create', author_controller.author_create_get);
router.post('/author/create', author_controller.author_create_post);
router.get('/author/:id/delete', author_controller.author_delete_get);
router.post('/author/:id/delete', author_controller.author_delete_post);
router.get('/author/:id/update', author_controller.author_update_get);
router.post('/author/:id/update', author_controller.author_update_post);
router.get('/author/:id', author_controller.author_detail);
router.get('/authors', author_controller.author_list);

router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post);
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
router.post('/genre/:id/delete', genre_controller.genre_delete_post);
router.get('/genre/:id/update', genre_controller.genre_update_get);
router.post('/genre/:id/update', genre_controller.genre_update_post);
router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genres', genre_controller.genre_list);

router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);
router.get('/bookinstances', book_instance_controller.bookinstance_list);

export default router;
