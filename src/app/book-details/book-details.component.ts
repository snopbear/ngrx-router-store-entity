import { IBook } from '../model/book';
import { selectBookById } from '../state/book.selectors';
import { loadBooks, updateBook } from '../state/book.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<IBook | undefined>;
  bookId: string;
  book: IBook | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.book$ = this.store.pipe(select(selectBookById(this.bookId)));
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks()); // Ensure books are loaded

    // Subscribe to book$ and clone the book object
    this.book$.subscribe((book) => {
      if (book) {
        this.book = { ...book }; // Clone the book object
      }
    });
  }

  // onSave(): void {
  //   if (this.book) {
  //     this.store.dispatch(updateBook({ book: this.book }));
  //     this.router.navigate(['/books']);
  //   }
  // }

  // cancel(): void {
  //   this.router.navigate(['/books']);
  // }
  back(): void {
    this.router.navigate(['/books']);
  }
}
