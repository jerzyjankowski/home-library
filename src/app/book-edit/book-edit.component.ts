import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {Book} from '../book/book.model';
import {QuickBookInputParserService} from './quick-book-input-parser.service';
import {BooksManagerService} from '../books/books-manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AttributeType } from '../attribute-option/attribute-option.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddBookElementValueModalComponent} from '../add-book-element-value-modal/add-book-element-value-modal.component';
import {ToastsService} from '../toasts/services/toasts.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  AttributeType = AttributeType;

  book: Book = new Book();
  available = {
    medias: ['ebook', 'paperback', 'webpage', 'video', 'notes'],
    publishers: [],
    sourceNames: [],
    categories: [],
    subcategories: [],
    tags: []
  };

  fileToUpload: File = null;
  editMode = false;
  matchedBooks: Book[] = [];
  displayMatchedBooks = true;

  prepareNextNewBookForm = new FormGroup({
    continueWithNextBook: new FormControl(false),
    persistingMediaField: new FormControl(false),
    persistingEditionField: new FormControl(false),
    persistingPublisherField: new FormControl(false),
    persistingCategoryField: new FormControl(false),
    persistingSubcategoryField: new FormControl(false),
    persistingTagsField: new FormControl(false),
    persistingSourcesField: new FormControl(false),
    persistingNoteField: new FormControl(false),
  });

  constructor(
    private sanitizer: DomSanitizer,
    private quickBookInputParserService: QuickBookInputParserService,
    private booksManagerService: BooksManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private location: Location,
    private toastsService: ToastsService
  ) {}

  ngOnInit(): void {
    this.editMode = this.route.snapshot.url.length === 3 && this.route.snapshot.url[2].toString() === 'edit';
    if (this.editMode) {
      this.booksManagerService.getBook(this.route.snapshot.url[1].toString()).subscribe(result => {
        this.book = result;
      });
    }
    this.booksManagerService.getAvailableListsForBook().subscribe((lists: any) => {
      this.available.publishers = lists.publishers;
      this.available.sourceNames = lists.sourceNames;
      this.available.categories = lists.categories;
      this.available.subcategories = lists.subcategories;
      this.available.tags = lists.tags;
    });
  }

  selectTag(value: string): void {
    if (this.book.tags.indexOf(value) === -1) {
      this.book.tags.push(value);
    }
  }

  unselectTag(value: string): void {
    if (this.book.tags.indexOf(value) !== -1) {
      this.book.tags.splice(this.book.tags.indexOf(value), 1);
    }
  }

  unselectSource(index: number): void {
    if (index < this.book.sources.length) {
      this.book.sources.splice(index, 1);
    }
  }

  handleCoverImageFileInputChange(fileInput: Event): void {
    const files = (fileInput.target as HTMLInputElement).files;

    if (files && files[0] && this.isImageFile(files[0])) {
      this.fileToUpload = files.item(0);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.book.coverUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  public handlePaste(event: ClipboardEvent): void {
    const pastedImage = this.getPastedImage(event);
    if (pastedImage) {
      // this.toBase64(pastedImage);
      this.removeCover();
      this.fileToUpload = pastedImage;
      const url = URL.createObjectURL(pastedImage);
      this.book.coverUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if (event.clipboardData.getData('text')) {
      this.quickBookInputParserService.parseAndUpdateBookWithRaw(this.book, event.clipboardData.getData('text'));
      this.searchMatchedBooks();
    } else {
      console.log('ERROR: pasted something unknown');
    }
    event.preventDefault();
  }

  private getPastedImage(event: ClipboardEvent): File | null {
    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files.length &&
      this.isImageFile( event.clipboardData.files[0])
    ) {
      return(event.clipboardData.files[0]);
    }
    return null;
  }

  private isImageFile(file: File): boolean {
    return(file.type.search( /^image\//i ) === 0);
  }

  private toBase64(file: File): void {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }).then(result => {
      console.log(result);
    });
  }

  removeCover(): void {
    this.fileToUpload = null;
    if (this.book.coverUrl && typeof this.book.coverUrl === 'string' ) {
      URL.revokeObjectURL(this.book.coverUrl);
    }
    this.book.coverUrl = null;
  }

  addNewBook(): void {
    this.booksManagerService.createBook(this.book, this.fileToUpload).subscribe(() => {
      if (!this.prepareNextNewBookForm.get('continueWithNextBook').value) {
        this.router.navigate(['books']);
      } else {
        const newBook = new Book();
        if (this.prepareNextNewBookForm.get('persistingMediaField').value) {
          newBook.media = this.book.media;
        }
        if (this.prepareNextNewBookForm.get('persistingEditionField').value) {
          newBook.edition = this.book.edition;
        }
        if (this.prepareNextNewBookForm.get('persistingPublisherField').value) {
          newBook.publisher = this.book.publisher;
        }
        if (this.prepareNextNewBookForm.get('persistingCategoryField').value) {
          newBook.category = this.book.category;
        }
        if (this.prepareNextNewBookForm.get('persistingSubcategoryField').value) {
          newBook.subcategory = this.book.subcategory;
        }
        if (this.prepareNextNewBookForm.get('persistingTagsField').value) {
          newBook.tags = this.book.tags;
        }
        if (this.prepareNextNewBookForm.get('persistingSourcesField').value) {
          newBook.sources = this.book.sources;
        }
        if (this.prepareNextNewBookForm.get('persistingNoteField').value) {
          newBook.note = this.book.note;
        }
        this.book = newBook;
        this.matchedBooks = [];
      }
    });
  }

  updateBook(): void {
    this.booksManagerService.updateBook(this.book, this.fileToUpload).subscribe(() => {
      this.router.navigate(['books']);
    });
  }

  navigateBack(): void {
    this.location.back();
  }

  removeReading(index: number): void {
    this.book.readings.splice(index, 1);
  }

  createReading(): void  {
    this.book.readings.push({date: '', time: 0, note: ''});
  }

  startCreatingNewPublisher(): void {
    this.createModalForNewValue({
      fieldName: 'publisher', collection: this.available.publishers, minLength: 3,
      onResult: (newValue: string) => {
        this.available.publishers.push(newValue);
        this.book.publisher = newValue;
      }
    });
  }

  createModalForNewValue(config: {
      fieldName: string,
      collection: any,
      minLength: number,
      onResult: (newValue: string) => void}): void {
    const modal = this.modalService.open(AddBookElementValueModalComponent);
    modal.componentInstance.title = `add new ${config.fieldName}`;
    modal.componentInstance.checkAvailability = ((value: string) => {
      if (value.length < 3) {
        return {available: false, message: `new ${config.fieldName} too short`};
      }
      if (config.collection.filter((publisher => publisher.toLowerCase() === value.toLowerCase())).length > 0) {
        return {available: false, message: `${config.fieldName} already exists`};
      }
      return {available: true, message: ''};
    });
    modal.result.then((newValue: string) => {
      config.onResult(newValue);
    }, () => {});
  }

  startCreatingNewCategory(): void {
    this.createModalForNewValue({
      fieldName: 'category', collection: this.available.categories, minLength: 3,
      onResult: (newValue: string) => {
        this.available.categories.push(newValue);
        this.available.subcategories[newValue] = [];
        this.book.category = newValue;
        this.book.subcategory = null;
      }
    });
  }

  startCreatingNewSubcategory(): void {
    this.createModalForNewValue({
      fieldName: 'subcategory', collection: this.available.subcategories[this.book.category], minLength: 3,
      onResult: (newValue: string) => {
        this.available.subcategories[this.book.category].push(newValue);
        this.book.subcategory = newValue;
      }
    });
  }

  startCreatingNewTag(): void {
    this.createModalForNewValue({
      fieldName: 'tag', collection: this.available.tags, minLength: 2,
      onResult: (newValue: string) => {
        this.available.tags.push(newValue);
        this.book.tags.push(newValue);
      }
    });
  }

  addNewSource(): void {
    this.book.sources.push({name: null, location: ''});
  }

  startCreatingNewSource(index: number): void {
    this.createModalForNewValue({
      fieldName: 'source name', collection: this.available.sourceNames, minLength: 3,
      onResult: (newValue: string) => {
        this.available.sourceNames.push(newValue);
        this.book.sources[index].name = newValue;
      }
    });
  }

  searchMatchedBooks(): void {
    if ( !this.editMode) {
      this.booksManagerService.searchForMatchedBooks({
          title: this.book.title ? this.book.title : '',
          authors: this.book.authors ? this.book.authors : ''
      }).subscribe(result => {
        this.matchedBooks = result;
        if (result.length === 0) {
          this.toastsService.showGoodNotification('Not found any similar books');
        } else {
          this.toastsService.showBadNotification(`Found ${result.length} similar book${result.length > 1 ? 's' : ''}`);
        }
      });
    }
  }

  toggleMatchedBooks(): void {
    this.displayMatchedBooks = !this.displayMatchedBooks;
  }

  goToBook(bookId: string): void {
    this.router.navigate(['books', bookId, 'edit']);
  }
}
