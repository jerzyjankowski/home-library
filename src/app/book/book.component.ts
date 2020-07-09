import {Component, Input, OnInit} from '@angular/core';
import {Book} from './book.model';
import { AttributeType } from '../attribute-option/attribute-option.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  AttributeType = AttributeType;

  @Input() book: Book;

  constructor() { }

  ngOnInit(): void {
  }

  getSourcesText(): string {
    return this.book.sources && this.book.sources.length > 0 ? this.book.sources.map(source => source.name).join(', ') : '';
  }
}
