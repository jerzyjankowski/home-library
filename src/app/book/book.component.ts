import {Component, Input, OnInit} from '@angular/core';
import {Book} from './book.model';
import { AttributeType } from '../attribute-option/attribute-option.component';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {BooksManagerService} from '../books/books-manager.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('open', style({height: '*', opacity: '1'})),
      state('closed', style({height: 0, 'padding-top': 0, 'padding-bottom': 0, opacity: '0'})),

      transition('closed => open', [
        group([
          animate(300, style({height: '*', 'padding-top': '*', 'padding-bottom': '*'})),
          animate(200, style({opacity: '1'}))
        ])
      ]),
      transition('open => closed', [
        group([
          animate(200, style({opacity: '0'})),
          animate(300, style({height: 0, 'padding-top': 0, 'padding-bottom': 0}))
        ])
      ])
    ])
  ]
})
export class BookComponent implements OnInit {
  AttributeType = AttributeType;
  @Input() book: Book;
  additionalOptions = false;

  constructor(
    private router: Router,
    private booksManagerService: BooksManagerService
  ) { }

  ngOnInit(): void {
  }

  getSourcesText(): string {
    return this.book.sources && this.book.sources.length > 0 ? this.book.sources.map(source => source.name).join(', ') : '';
  }

  editBook(): void {
    this.router.navigate(['books', this.book.id, 'edit']);
  }

  attributeChanged(): void {
    this.booksManagerService.updateBook(this.book, null).subscribe(
      () => console.log('updated'),
      (error) => console.log(error)
    );
  }
}
