import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../book/book.model';

export enum AttributeType {
  marked, recommended, notRecommended, revised, current, paused, finished, archived
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
      case AttributeType.marked: return 'marked';
      case AttributeType.recommended: return 'recommended';
      case AttributeType.notRecommended: return 'not recommended';
      case AttributeType.revised: return 'revised';
      case AttributeType.current: return 'current';
      case AttributeType.paused: return 'paused';
      case AttributeType.finished: return 'finished';
      case AttributeType.archived: return 'archived';
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
      case AttributeType.marked: return 'icon-star';
      case AttributeType.recommended: return 'icon-thumbs-up-alt';
      case AttributeType.notRecommended: return 'icon-thumbs-down-alt';
      case AttributeType.revised: return 'icon-eye';
      case AttributeType.current: return 'icon-flash';
      case AttributeType.paused: return 'icon-pause';
      case AttributeType.finished: return 'icon-ok';
      case AttributeType.archived: return 'icon-trash-empty';
    }
  }

  getColorClass(): string {
    switch (this.type) {
      case AttributeType.recommended: return this.book.recommendation === 'recommended' ? 'good' : '';
      case AttributeType.notRecommended: return this.book.recommendation === 'notRecommended' ? 'bad' : '';
      case AttributeType.revised: return this.book.state === 'revised' ? 'warn' : '';
      case AttributeType.current: return this.book.state === 'current' ? 'warn' : '';
      case AttributeType.paused: return this.book.state === 'paused' ? 'warn' : '';
      case AttributeType.finished: return this.book.state === 'finished' ? 'good' : '';
      case AttributeType.marked: return this.book.marked ? 'warn' : '';
      case AttributeType.archived: return this.book.archived ? 'bad' : '';
    }
  }

  toggle(): void {
    if (!this.clickable) {
      return;
    }
    switch (this.type) {
      case AttributeType.marked:
        this.book.marked = !this.book.marked;
        break;
      case AttributeType.recommended:
        this.book.recommendation = (this.book.recommendation === 'recommended' ? 'neutral' : 'recommended');
        break;
      case AttributeType.notRecommended:
        this.book.recommendation = (this.book.recommendation === 'notRecommended' ? 'neutral' : 'notRecommended');
        break;
      case AttributeType.revised:
        this.book.state = (this.book.state === 'revised' ? 'fresh' : 'revised');
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
      case AttributeType.archived:
        this.book.archived = !this.book.archived;
        break;
    }
    this.clicked.emit();
  }


}
