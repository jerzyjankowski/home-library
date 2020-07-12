import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BooksManagerService} from '../books/books-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../book/book.model';
import {debounceTime, map, switchMap, throttleTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

type filtersType = { marked: any[]; recommendation: string[]; state: string[]; title: any; type: string[]; tags: string[] };

@Component({
  selector: 'app-books-searchbox',
  templateUrl: './books-searchbox.component.html',
  styleUrls: ['./books-searchbox.component.scss']
})
export class BooksSearchboxComponent implements OnInit {
  @Output() loading: EventEmitter<void> = new EventEmitter<void>();
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
    this.loadFiltersFromSessionStorage();
    this.searchSubject.pipe(
      debounceTime(500),
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
    this.searchBooks(true);
  }

  searchBooks(now: boolean = false): void {
    this.loading.emit();
    const marked = [];
    if (this.filterForm.get('marked').get('marked').value) {
      marked.push(true);
    }
    if (this.filterForm.get('marked').get('notMarked').value) {
      marked.push(false);
    }
    const selectedFilterAttributes: filtersType = {
      title: this.filterForm.get('title').value,
      tags: this.searchTags,
      recommendation: this.recommendationFilterNames.filter(filterName => this.filterForm.get('recommendation').get(filterName).value),
      state: this.stateFilterNames.filter(filterName => this.filterForm.get('state').get(filterName).value),
      type: this.typeFilterNames.filter(filterName => this.filterForm.get('type').get(filterName).value),
      marked
    };
    this.saveFiltersInSessionStorage(selectedFilterAttributes);
    if (now) {
      this.booksManagerService.getFilteredBooks(selectedFilterAttributes).subscribe((books: Book[]) => {
        this.foundBooks.emit(books);
      });
    } else {
      this.searchSubject.next(selectedFilterAttributes);
    }
  }

  saveFiltersInSessionStorage(selectedFilterAttributes: filtersType): void {
    sessionStorage.setItem('filters', JSON.stringify({
      title: selectedFilterAttributes.title,
      tags: selectedFilterAttributes.tags,
      recommendation: selectedFilterAttributes.recommendation,
      state: selectedFilterAttributes.state,
      type: selectedFilterAttributes.type,
      marked: selectedFilterAttributes.marked
    }));
  }

  loadFiltersFromSessionStorage(): void {
    const loadedFilters: filtersType = JSON.parse(sessionStorage.getItem('filters'));
    if (loadedFilters) {
      this.filterForm.get('title').setValue(loadedFilters.title);
      if (loadedFilters.tags) {
        this.searchTags = loadedFilters.tags;
      }
      if (loadedFilters.recommendation) {
        this.recommendationFilterNames.forEach(filterName => {
          this.filterForm.get('recommendation').get(filterName).setValue(loadedFilters.recommendation.indexOf(filterName) !== -1);
        });
      }
      if (loadedFilters.state) {
        this.stateFilterNames.forEach(filterName => {
          this.filterForm.get('state').get(filterName).setValue(loadedFilters.state.indexOf(filterName) !== -1);
        });
      }
      if (loadedFilters.type) {
        this.typeFilterNames.forEach(filterName => {
          this.filterForm.get('type').get(filterName).setValue(loadedFilters.type.indexOf(filterName) !== -1);
        });
      }
      if (loadedFilters.marked) {
        this.filterForm.get('marked').get('marked').setValue(loadedFilters.marked.indexOf(true) !== -1);
        this.filterForm.get('marked').get('notMarked').setValue(loadedFilters.marked.indexOf(false) !== -1);
      }
    }
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

  restartFilters(): void {
    this.filterForm.get('title').setValue('');
    this.searchTags.length = 0;
    this.recommendationFilterNames.forEach(filterName => {
      this.filterForm.get('recommendation').get(filterName).setValue(true);
    });
    this.stateFilterNames.forEach(filterName => {
      this.filterForm.get('state').get(filterName).setValue(true);
    });
    this.typeFilterNames.forEach(filterName => {
      this.filterForm.get('type').get(filterName).setValue(true);
    });
    this.filterForm.get('marked').get('marked').setValue(true);
    this.filterForm.get('marked').get('notMarked').setValue(true);
    this.searchBooks(true);
  }
}
