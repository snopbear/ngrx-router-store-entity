import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { addBook, deleteBook, loadBooks, updateBook } from '../state/book.actions';
import { selectAllBooks, selectBooksError } from '../state/book.selectors';
import { IBook } from '../model/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books$: Observable<IBook[]> = this.store.pipe(select(selectAllBooks));
  error$: Observable<string | null> = this.store.pipe(select(selectBooksError));
  newBook: IBook = { id: '', title: '', author: '' };

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    // Load books on initialization
    // Assuming there's an action to load books
    this.store.dispatch(loadBooks());
  }

  onAddBook(): void {
    if (this.newBook.title && this.newBook.author) {
      this.newBook.id = this.generateId(); // Generate a unique ID
      this.store.dispatch(addBook({ book: this.newBook }));
      this.resetForm();
    }
  }

  editBook(book: IBook): void {
    this.router.navigate(['/edit', book.id]); // Navigate to edit page
  }

  viewDetails(bookId: string): void {
    this.router.navigate(['/details', bookId]);
  }

  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.store.dispatch(deleteBook({ id: bookId }));
    }
  }

  private resetForm(): void {
    this.newBook = { id: '', title: '', author: '' };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Simple ID generator
  }
}