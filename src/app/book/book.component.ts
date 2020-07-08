import {Component, Input, OnInit} from '@angular/core';
import {Book} from './book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit(): void {
  }

  getSourcesText(): string {
    return this.book.sources && this.book.sources.length > 0 ? this.book.sources.map(source => source.name).join(', ') : '';
  }
}
