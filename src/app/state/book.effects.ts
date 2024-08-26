import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  addBook,
  addBookSuccess,
  addBookFailure,
  deleteBook,
  deleteBookSuccess,
  deleteBookFailure,
  loadBooks,
  loadBooksSuccess,
  loadBooksFailure,
  updateBook,
  updateBookSuccess,
  updateBookFailure,
} from './book.actions';
import { BookService } from '../service/book.service';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private bookService: BookService) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      mergeMap(() =>
        this.bookService.getBooks().pipe(
          map((books) => loadBooksSuccess({ books })),
          catchError((error) => of(loadBooksFailure({ error })))
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBook),
      mergeMap((action) =>
        this.bookService.addBook(action.book).pipe(
          map((book) => addBookSuccess({ book })),
          catchError((error) => of(addBookFailure({ error })))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBook),
      mergeMap((action) =>
        this.bookService.updateBook(action.book).pipe(
          map((book) => updateBookSuccess({ book })),
          catchError((error) => of(updateBookFailure({ error })))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBook),
      mergeMap((action) =>
        this.bookService.deleteBook(action.id).pipe(
          map(() => deleteBookSuccess({ id: action.id })),
          catchError((error) => of(deleteBookFailure({ error })))
        )
      )
    )
  );
}
