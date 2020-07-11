import { Component, OnInit } from '@angular/core';
import {Book} from '../book/book.model';
import {BooksManagerService} from './books-manager.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  loading = false;

  constructor(
    private booksManagerService: BooksManagerService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.booksManagerService.getBooks().subscribe(books => {
      this.books = books;
      this.loading = false;
    });
  }

}
