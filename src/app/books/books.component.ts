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

  constructor(
    private booksManagerService: BooksManagerService
  ) { }

  ngOnInit(): void {
    this.books = this.booksManagerService.getBooks();
  }

}
