import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BooksManagerService} from '../books/books-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../book/book.model';
import {debounceTime, map, switchMap, throttleTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-books-searchbox',
  templateUrl: './books-searchbox.component.html',
  styleUrls: ['./books-searchbox.component.scss']
})
export class BooksSearchboxComponent implements OnInit {
  @Output() foundBooks: EventEmitter<Array<Book>> = new EventEmitter<Array<Book>>();
  searchSubject = new Subject();

  searchTitle = '';
  searchTags: string[] = [];
  availableTags: string[] = [];

  recommendationFilterNames = ['recommended', 'neutral', 'notRecommended'];
  stateFilterNames = ['fresh', 'current', 'paused', 'finished'];
  typeFilterNames = ['ebook', 'paperback', 'video', 'webpage'];

  filterForm = new FormGroup({
    title: new FormControl(''),
    recommendation: new FormGroup({
      recommended: new FormControl(true),
      neutral: new FormControl(true),
      notRecommended: new FormControl(true)
    }),
    state: new FormGroup({
      fresh: new FormControl(true),
      current: new FormControl(true),
      paused: new FormControl(true),
      finished: new FormControl(true)
    }),
    marked: new FormGroup({
      marked: new FormControl(true),
      notMarked: new FormControl(true)
    }),
    type: new FormGroup({
      ebook: new FormControl(true),
      paperback: new FormControl(true),
      video: new FormControl(true),
      webpage: new FormControl(true)
    }),
  });

  constructor(
    private router: Router,
    private booksManagerService: BooksManagerService
  ) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(1500),
      switchMap(selectedFilterAttributes => this.booksManagerService.getFilteredBooks(selectedFilterAttributes))
    ).subscribe((books: Book[]) => {
      this.foundBooks.emit(books);
    });

    this.booksManagerService.getTags().subscribe((tags: string[]) => {
      this.availableTags = tags;
    });
    this.filterForm.valueChanges.subscribe(() => {
      this.searchBooks();
    });
    this.searchBooks();
  }

  searchBooks(): void {
    const marked = [];
    if (this.filterForm.get('marked').get('marked').value) {
      marked.push(true);
    }
    if (this.filterForm.get('marked').get('notMarked').value) {
      marked.push(false);
    }
    console.log(this.searchTags);
    const selectedFilterAttributes = {
      title: this.filterForm.get('title').value,
      tags: this.searchTags,
      recommendation: this.recommendationFilterNames.filter(filterName => this.filterForm.get('recommendation').get(filterName).value),
      state: this.stateFilterNames.filter(filterName => this.filterForm.get('state').get(filterName).value),
      type: this.typeFilterNames.filter(filterName => this.filterForm.get('type').get(filterName).value),
      marked
    };
    this.searchSubject.next(selectedFilterAttributes);
  }

  onAddBook(): void {
    this.router.navigate(['books', 'new']);
  }

  addTag(searchPhraseInput: HTMLInputElement): void {
    if (this.searchTags.indexOf(searchPhraseInput.value) === -1) {
      this.searchTags.push(searchPhraseInput.value);
    }
    searchPhraseInput.value = '';
    this.searchBooks();
  }

  untag(index: number): void {
    if (index < this.searchTags.length) {
      this.searchTags.splice(index, 1);
    }
    this.searchBooks();
  }

  addTitle(title: string): void {
    this.searchTitle = title;
  }
}
