import { createReducer, on } from '@ngrx/store';
import {
  addBookSuccess,
  deleteBookSuccess,
  loadBooksSuccess,
  updateBookSuccess,
} from './book.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IBook } from '../model/book';

export interface BookState extends EntityState<IBook> {
  error: any;
}

export const adapter = createEntityAdapter<IBook>();

export const initialState: BookState = adapter.getInitialState({
  error: null,
});

export const bookReducer = createReducer(
  initialState,
  on(loadBooksSuccess, (state, { books }) =>
    adapter.setAll(books, { ...state, error: null })
  ),
  on(addBookSuccess, (state, { book }) =>
    adapter.addOne(book, { ...state, error: null })
  ),
  on(updateBookSuccess, (state, { book }) =>
    adapter.updateOne({ id: book.id, changes: book }, { ...state, error: null })
  ),
  on(deleteBookSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, error: null })
  )
);
