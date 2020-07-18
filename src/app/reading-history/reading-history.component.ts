import { Component, OnInit } from '@angular/core';
import {BooksManagerService} from '../books/books-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reading-history',
  templateUrl: './reading-history.component.html',
  styleUrls: ['./reading-history.component.scss']
})
export class ReadingHistoryComponent implements OnInit {
  history: {bookId: string, bookTitle: string, date: string, note: string}[];

  constructor(
    private booksManagerService: BooksManagerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.booksManagerService.getReadingHistory().subscribe(result => {
      this.history = result;
    });
  }

  editBook(bookId: string): void {
    this.router.navigate(['books', bookId, 'edit']);
  }
}
