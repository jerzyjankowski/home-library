import {Component, Input, OnInit} from '@angular/core';
import {Book} from './book.model';
import { AttributeType } from '../attribute-option/attribute-option.component';
import {animate, group, state, style, transition, trigger} from '@angular/animations';

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

  constructor() { }

  ngOnInit(): void {
  }

  getSourcesText(): string {
    return this.book.sources && this.book.sources.length > 0 ? this.book.sources.map(source => source.name).join(', ') : '';
  }
}
