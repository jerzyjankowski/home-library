import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Book} from '../book/book.model';
import {QuickBookInputParserService} from './quick-book-input-parser.service';
import {BooksManagerService} from '../books/books-manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AttributeType } from '../attribute-option/attribute-option.component';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  AttributeType = AttributeType;

  book: Book = new Book();
  available = {
    types: ['ebook', 'paperback', 'webpage', 'video'],
    publishers: [],
    sourceNames: [],
    categories: [],
    subCategories: [],
    tags: []
  };

  showNewSourceFormControls = false;
  fileToUpload: File = null;
  editMode = false;

  constructor(
    private sanitizer: DomSanitizer,
    private quickBookInputParserService: QuickBookInputParserService,
    private booksManagerService: BooksManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editMode = this.route.snapshot.url.length === 3 && this.route.snapshot.url[2].toString() === 'edit';
    if (this.editMode) {
      this.booksManagerService.getBook(this.route.snapshot.url[1].toString()).subscribe(result => {
        this.book = result;
      });
    }
    this.booksManagerService.getAvailableListsForBook().subscribe((lists: any) => {
      console.log(lists);
      this.available.publishers = lists.publishers;
      this.available.sourceNames = lists.sourceNames;
      this.available.categories = lists.categories;
      this.available.subCategories = lists.subCategories;
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

  createNewTag(newTag: HTMLInputElement): void {
    if (this.available.tags.indexOf(newTag.value) === -1 && this.book.tags.indexOf(newTag.value) === -1) {
      this.available.tags.push(newTag.value);
      this.selectTag(newTag.value);
    }
    newTag.value = '';
  }

  addNewSource(name: HTMLSelectElement, location: HTMLInputElement): void {
    if (name && location && this.available.sourceNames.indexOf(name.value) !== -1) {
      this.book.sources.push({name: name.value, location: location.value});
    }
    name.value = null;
    location.value = null;
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
      this.book = this.quickBookInputParserService.parse(event.clipboardData.getData('text'));
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
      this.router.navigate(['books']);
    });
  }

  updateBook(): void {
    this.booksManagerService.updateBook(this.book, this.fileToUpload).subscribe(() => {
      this.router.navigate(['books']);
    });
  }

  navigateToBooks(): void {
    this.router.navigate(['books']);
  }

  removeReading(index: number): void {
    this.book.readings.splice(index, 1);
  }

  createReading(): void  {
    this.book.readings.push({date: '', note: ''});
  }
}
