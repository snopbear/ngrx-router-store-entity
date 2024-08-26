import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, BookState } from './book.reducer';

export const selectBookState = createFeatureSelector<BookState>('books');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllBooks = createSelector(selectBookState, selectAll);

export const selectBookEntities = createSelector(
  selectBookState,
  selectEntities
);

export const selectBookById = (id: string) =>
  createSelector(selectBookEntities, (entities) => entities[id]);

export const selectBooksError = createSelector(
  selectBookState,
  (state) => state.error
);
