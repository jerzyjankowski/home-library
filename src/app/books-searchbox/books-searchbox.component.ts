import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BooksManagerService} from '../books/books-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../book/book.model';

@Component({
  selector: 'app-books-searchbox',
  templateUrl: './books-searchbox.component.html',
  styleUrls: ['./books-searchbox.component.scss']
})
export class BooksSearchboxComponent implements OnInit {
  @Output() foundBooks: EventEmitter<Array<Book>> = new EventEmitter<Array<Book>>();

  availableTags: string[] = [];
  searchPhrases: string[] = [];

  filter = {
    recommended: true,
    neutral: true,
    notRecommended: true
  };
  recommendationFilterNames = ['recommended', 'neutral', 'notRecommended'];

  filterForm = new FormGroup({
    recommendation: new FormGroup({
      recommended: new FormControl(true),
      neutral: new FormControl(true),
      notRecommended: new FormControl(true)
    })
  });

  constructor(
    private router: Router,
    private booksManagerService: BooksManagerService
  ) { }

  ngOnInit(): void {
    this.booksManagerService.getTags().subscribe((tags: string[]) => {
      this.availableTags = tags;
    });
    this.filterForm.valueChanges.subscribe(() => {
      this.searchBooks();
    });
    this.searchBooks();
  }

  searchBooks(): void {
    const selectedFilterAttributes = {
      recommendation: this.recommendationFilterNames.filter(filterName => this.filterForm.get('recommendation').get(filterName).value)
    };
    this.booksManagerService.getFilteredBooks(selectedFilterAttributes).subscribe((books: Book[]) => {
      this.foundBooks.emit(books);
    });
  }

  onAddBook(): void {
    this.router.navigate(['books', 'new']);
  }

  createNewSearchPhrase(searchPhraseInput: HTMLInputElement): void {
    if (this.searchPhrases.indexOf(searchPhraseInput.value) === -1) {
      this.searchPhrases.push(searchPhraseInput.value);
    }
    searchPhraseInput.value = '';
  }

  removeSearchPhrase(index: number): void {
    if (index < this.searchPhrases.length) {
      this.searchPhrases.splice(index, 1);
    }
  }
}
