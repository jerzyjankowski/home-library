import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../book/book.model';

export enum AttributeType {
  recommended, notRecommended, current, paused, finished, starred
}

@Component({
  selector: 'app-attribute-option',
  template: `
    <i [ngbTooltip]="getTooltipText()"
       [class]="getClasses()"
       (click)="toggle()"></i>
  `,
  styles: [
    `i { cursor: pointer }`,
    `.good { color: #28a745 }`,
    `.warn { color: #ffc107 }`,
    `.bad { color: #dc3545 }`,
    `.hidden { display: none }`
  ]
})
export class AttributeOptionComponent implements OnInit {
  @Input() type: AttributeType;
  @Input() book: Book;
  @Input() clickable = true;
  @Input() defaultHidden = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getTooltipText(): string {
    switch (this.type) {
      case AttributeType.recommended: return 'recommended';
      case AttributeType.notRecommended: return 'not recommended';
      case AttributeType.current: return 'current';
      case AttributeType.paused: return 'paused';
      case AttributeType.finished: return 'finished';
      case AttributeType.starred: return 'marked';
    }
  }

  getClasses(): string {
    return `${this.getHiddenClassForHidden()} ${this.getIconClass()} ${this.getColorClass()}`;
  }

  getHiddenClassForHidden(): string {
    return (this.defaultHidden && this.getColorClass() === '') ? 'hidden' : '';
  }

  getIconClass(): string {
    switch (this.type) {
      case AttributeType.recommended: return 'icon-thumbs-up-alt';
      case AttributeType.notRecommended: return 'icon-thumbs-down-alt';
      case AttributeType.current: return 'icon-flash';
      case AttributeType.paused: return 'icon-pause';
      case AttributeType.finished: return 'icon-ok';
      case AttributeType.starred: return 'icon-star';
    }
  }

  getColorClass(): string {
    switch (this.type) {
      case AttributeType.recommended: return this.book.recommendation === 'YES' ? 'good' : '';
      case AttributeType.notRecommended: return this.book.recommendation === 'NO' ? 'bad' : '';
      case AttributeType.current: return this.book.state === 'current' ? 'warn' : '';
      case AttributeType.paused: return this.book.state === 'paused' ? 'warn' : '';
      case AttributeType.finished: return this.book.state === 'finished' ? 'good' : '';
      case AttributeType.starred: return this.book.starred ? 'warn' : '';
    }
  }

  toggle(): void {
    if (!this.clickable) {
      return;
    }
    switch (this.type) {
      case AttributeType.recommended:
        this.book.recommendation = (this.book.recommendation === 'YES' ? null : 'YES');
        break;
      case AttributeType.notRecommended:
        this.book.recommendation = (this.book.recommendation === 'NO' ? null : 'NO');
        break;
      case AttributeType.current:
        this.book.state = (this.book.state === 'current' ? 'fresh' : 'current');
        break;
      case AttributeType.paused:
        this.book.state = (this.book.state === 'paused' ? 'fresh' : 'paused');
        break;
      case AttributeType.finished:
        this.book.state = (this.book.state === 'finished' ? 'fresh' : 'finished');
        break;
      case AttributeType.starred:
        this.book.starred = !this.book.starred;
        break;
    }
    this.clicked.emit();
  }


}
