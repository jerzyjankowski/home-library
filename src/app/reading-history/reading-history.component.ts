import { Component, OnInit } from '@angular/core';
import {BooksManagerService} from '../books/books-manager.service';

@Component({
  selector: 'app-reading-history',
  templateUrl: './reading-history.component.html',
  styleUrls: ['./reading-history.component.scss']
})
export class ReadingHistoryComponent implements OnInit {
  history: {bookId: string, bookTitle: string, date: string, note: string}[];

  constructor(
    private booksManagerService: BooksManagerService
  ) { }

  ngOnInit(): void {
    this.booksManagerService.getReadingHistory().subscribe(result => {
      this.history = result;
    });
  }

}
