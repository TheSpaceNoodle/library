import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import { Book, Genre } from '../models/index.js';

// Display list of al Genre.
export const genre_list = asyncHandler(async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 }).exec();

  res.render('genre_list', {
    title: 'Genre List',
    genre_list: genres,
  });
});

// Display detail page for a specific Genre.
export const genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksByGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, 'title summary').exec(),
  ]);

  if (!genre) {
    const err = new Error('Genre not found');
    err.status = 404;
    return next(err);
  }

  res.render('genre_detail', {
    title: 'Genre Detail',
    genre: genre,
    genre_books: booksByGenre,
  });
});

// Display Genre create form on GET.
export const genre_create_get = asyncHandler(async (req, res, next) => {
  res.render('genre_form', { title: 'Create Genre' });
});

// Handle Genre create on POST.
export const genre_create_post = [
  body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: 'en', strength: 2 }).exec();
      if (genreExists) {
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }
  }),
];

// Display Genre delete form on GET.
export const genre_delete_get = asyncHandler(async (req, res, next) => {
  const [genre, books] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }).exec(),
  ]);

  if (!genre) {
    return res.redirect('/catalog/genres');
  }

  res.render('genre_delete', {
    title: 'Delete Genre',
    genre: genre,
    books: books,
  });
});

// Handle Genre delete on POST.
export const genre_delete_post = asyncHandler(async (req, res, next) => {
  const books = await Book.find({ genre: req.body.genreid }).exec();

  if (books.length) {
    const err = new Error('You have to delete books first');
    err.status = 400;
    return next(err);
  }

  await Genre.findByIdAndDelete(req.body.genreid);
});

// Display Genre update form on GET.
export const genre_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update GET');
});

// Handle Genre update on POST.
export const genre_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update POST');
});
