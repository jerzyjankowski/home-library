import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BooksManagerService} from '../books/books-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../book/book.model';
import {debounceTime, map, switchMap, throttleTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

type filtersType = {
  page: number,
  title: string;
  sourceName: string;
  tags: string[];
  recommendation: string[];
  state: string[];
  marked: boolean[];
  archived: boolean[],
  media: string[];
  sort: 'createdAt' | 'updatedAt' | null;
  order: 'desc' | 'asc' | null;
};

@Component({
  selector: 'app-books-searchbox',
  templateUrl: './books-searchbox.component.html',
  styleUrls: ['./books-searchbox.component.scss']
})
export class BooksSearchboxComponent implements OnInit {
  @Output() loading: EventEmitter<void> = new EventEmitter<void>();
  @Output() foundBooks: EventEmitter<Array<Book>> = new EventEmitter<Array<Book>>();
  searchSubject$ = new Subject();
  currentPage = 1;
  maxPage = 4;

  searchTitle = '';
  searchTags: string[] = [];
  searchSourceName = '';
  availableTags: string[] = [];
  availableSourceNames: string[] = [];

  recommendationFilterNames = ['recommended', 'neutral', 'notRecommended'];
  stateFilterNames = ['fresh', 'revised', 'current', 'paused', 'finished'];
  mediaFilterNames = ['ebook', 'paperback', 'video', 'webpage', 'notes'];

  filterForm = new FormGroup({
    title: new FormControl(''),
    sourceName: new FormControl(''),
    recommendation: new FormGroup({
      recommended: new FormControl(true),
      neutral: new FormControl(true),
      notRecommended: new FormControl(true)
    }),
    state: new FormGroup({
      fresh: new FormControl(true),
      revised: new FormControl(true),
      current: new FormControl(true),
      paused: new FormControl(true),
      finished: new FormControl(true)
    }),
    marked: new FormGroup({
      marked: new FormControl(true),
      notMarked: new FormControl(true)
    }),
    archived: new FormGroup({
      archived: new FormControl(false),
      notArchived: new FormControl(true)
    }),
    media: new FormGroup({
      ebook: new FormControl(true),
      paperback: new FormControl(true),
      video: new FormControl(true),
      webpage: new FormControl(true),
      notes: new FormControl(true),
    }),
    sort: new FormGroup({
      sort: new FormControl(null),
      order: new FormControl(null),
    })
  });

  constructor(
    private router: Router,
    private booksManagerService: BooksManagerService
  ) { }

  ngOnInit(): void {
    this.loadFiltersFromSessionStorage();
    this.searchSubject$.pipe(
      debounceTime(500),
      switchMap(selectedFilterAttributes => this.booksManagerService.getFilteredBooks(selectedFilterAttributes))
    ).subscribe((result: {books: Book[], currentPage: number, maxPage: number}) => {
      this.currentPage = +result.currentPage;
      this.maxPage = +result.maxPage;
      this.foundBooks.emit(result.books);
    });

    this.booksManagerService.getAvailableListsForBook().subscribe((lists: any) => {
      this.availableTags = lists.tags;
      this.availableSourceNames = lists.sourceNames;
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

    const archived = [];
    if (this.filterForm.get('archived').get('archived').value) {
      archived.push(true);
    }
    if (this.filterForm.get('archived').get('notArchived').value) {
      archived.push(false);
    }

    const selectedFilterAttributes: filtersType = {
      page: this.currentPage,
      title: this.filterForm.get('title').value,
      sourceName: this.filterForm.get('sourceName').value,
      tags: this.searchTags,
      recommendation: this.recommendationFilterNames.filter(filterName => this.filterForm.get('recommendation').get(filterName).value),
      state: this.stateFilterNames.filter(filterName => this.filterForm.get('state').get(filterName).value),
      media: this.mediaFilterNames.filter(filterName => this.filterForm.get('media').get(filterName).value),
      marked,
      archived,
      sort: this.filterForm.get('sort').get('sort').value,
      order: this.filterForm.get('sort').get('order').value
    };

    this.saveFiltersInSessionStorage(selectedFilterAttributes);
    if (now) {
      this.booksManagerService.getFilteredBooks(selectedFilterAttributes)
          .subscribe((result: {books: Book[], currentPage: number, maxPage: number}) => {
        this.foundBooks.emit(result.books);
        this.currentPage = +result.currentPage;
        this.maxPage = +result.maxPage;
      });
    } else {
      this.searchSubject$.next(selectedFilterAttributes);
    }
  }

  saveFiltersInSessionStorage(selectedFilterAttributes: filtersType): void {
    sessionStorage.setItem('filters', JSON.stringify({
      page: selectedFilterAttributes.page,
      title: selectedFilterAttributes.title,
      sourceName: selectedFilterAttributes.sourceName,
      tags: selectedFilterAttributes.tags,
      recommendation: selectedFilterAttributes.recommendation,
      state: selectedFilterAttributes.state,
      media: selectedFilterAttributes.media,
      marked: selectedFilterAttributes.marked,
      archived: selectedFilterAttributes.archived,
      sort: selectedFilterAttributes.sort,
      order: selectedFilterAttributes.order,
    }));
  }

  loadFiltersFromSessionStorage(): void {
    const loadedFilters: filtersType = JSON.parse(sessionStorage.getItem('filters'));
    if (loadedFilters) {
      this.currentPage = loadedFilters.page;
      this.filterForm.get('title').setValue(loadedFilters.title);
      this.filterForm.get('sourceName').setValue(loadedFilters.sourceName);
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
      if (loadedFilters.media) {
        this.mediaFilterNames.forEach(filterName => {
          this.filterForm.get('media').get(filterName).setValue(loadedFilters.media.indexOf(filterName) !== -1);
        });
      }
      if (loadedFilters.marked) {
        this.filterForm.get('marked').get('marked').setValue(loadedFilters.marked.indexOf(true) !== -1);
        this.filterForm.get('marked').get('notMarked').setValue(loadedFilters.marked.indexOf(false) !== -1);
      }
      if (loadedFilters.archived) {
        this.filterForm.get('archived').get('archived').setValue(loadedFilters.archived.indexOf(true) !== -1);
        this.filterForm.get('archived').get('notArchived').setValue(loadedFilters.archived.indexOf(false) !== -1);
      }
      if (loadedFilters.sort) {
        this.filterForm.get('sort').get('sort').setValue(loadedFilters.sort);
        this.filterForm.get('sort').get('order').setValue(loadedFilters.order);
      }
    }
  }

  onAddBook(): void {
    this.router.navigate(['books', 'new']);
  }

  addTag(searchPhraseInput: HTMLInputElement): void {
    if (!searchPhraseInput.value) {
      return;
    }
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
    this.mediaFilterNames.forEach(filterName => {
      this.filterForm.get('media').get(filterName).setValue(true);
    });
    this.filterForm.get('marked').get('marked').setValue(true);
    this.filterForm.get('marked').get('notMarked').setValue(true);
    this.filterForm.get('archived').get('archived').setValue(false);
    this.filterForm.get('archived').get('notArchived').setValue(true);
    this.filterForm.get('sort').get('sort').setValue(null);
    this.filterForm.get('sort').get('order').setValue(null);
    this.searchBooks(true);
  }

  changeToPage(page: number): void {
    this.currentPage = page;
    this.searchBooks(true);
  }

  isSort(sort: string, order: string): boolean {
    const currentSort = this.filterForm.get('sort').get('sort').value;
    const currentOrder = this.filterForm.get('sort').get('order').value;
    return !!currentSort && !!currentOrder && currentSort === sort && currentOrder === order;
  }

  changeSort(sort: string): void {
    const currentSort = this.filterForm.get('sort').get('sort').value;
    const currentOrder = this.filterForm.get('sort').get('order').value;
    if (!currentSort || currentSort !== sort) {
      this.filterForm.get('sort').get('sort').setValue(sort);
      this.filterForm.get('sort').get('order').setValue('desc');
    } else if (currentOrder === 'desc') {
      this.filterForm.get('sort').get('order').setValue('asc');
    } else {
      this.filterForm.get('sort').get('sort').setValue(null);
      this.filterForm.get('sort').get('order').setValue(null);
    }
  }
}
