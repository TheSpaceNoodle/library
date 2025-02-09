import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import { Book, BookInstance } from '../models/index.js';

export const bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate('book').exec();

  res.render('bookinstance_list', {
    title: 'Book Instance List',
    bookinstance_list: allBookInstances,
  });
});

// Display detail page for a specific BookInstance.
export const bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec();

  if (bookInstance === null) {
    const err = new Error('Book copy not found');
    err.status = 404;
    return next(err);
  }

  res.render('bookinstance_detail', {
    title: 'Book:',
    bookinstance: bookInstance,
  });
});

// Display BookInstance create form on GET.
export const bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

  res.render('bookinstance_form', {
    title: 'Create BookInstance',
    book_list: allBooks,
  });
});

// Handle BookInstance create on POST.
export const bookinstance_create_post = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape(),
  body('due_back', 'Invalid date').optional({ values: 'falsy' }).isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

      res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    } else {
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }
  }),
];

// Display BookInstance delete form on GET.
export const bookinstance_delete_get = asyncHandler(async (req, res) => {
  const bookInstance = await BookInstance.findById(req.params.id).populate('book');

  if (!bookInstance) {
    res.redirect('/catalog/bookinstances');
  }

  res.render('bookinstance_delete', {
    title: 'Delete Book Instance',
    bookinstance: bookInstance,
  });
});

// Handle BookInstance delete on POST.
export const bookinstance_delete_post = asyncHandler(async (req, res) => {
  await BookInstance.findByIdAndDelete(req.body.bookinstanceid);
  return res.redirect('/catalog/bookinstances');
});

// Display BookInstance update form on GET.
export const bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
});

// Handle bookinstance update on POST.
export const bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
});
