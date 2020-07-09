import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Book} from '../book/book.model';
import {QuickBookInputParserService} from './quick-book-input-parser.service';
import {BooksManagerService} from '../books/books-manager.service';
import {Router} from '@angular/router';
import { AttributeType } from '../attribute-option/attribute-option.component';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  AttributeType = AttributeType;

  book: Book = new Book();
  availableTypes = ['ebook', 'paperback', 'webpage', 'video'];
  availableTags = ['Angular', 'CSS3', 'HTML5', 'Jasmine', 'JavaScript', 'Karma', 'MongoDB', 'Node', 'Protractor', 'React', 'TypeScript', 'Vue.js'];
  availableSources = ['PacktPub', 'Manning', 'Udemy'];
  availableCategoriesWithSubcategories: Map<string, string[]> = new Map([
      ['Backend', ['C lang', 'C#', 'C++', 'Django', 'dotNET', 'Flask', 'Go', 'Groovy', 'Java', 'JavaFX', 'Node.js', 'PHP', 'Python', 'R', 'Rails', 'Ruby', 'Scala', 'Spring']],
      ['Frontend', ['Angular', 'AngularJS', 'Bootstrap', 'HTML and CSS', 'JavaScript', 'jQuery', 'MeteorJS', 'ReactJS', 'TypeScript', 'Vue.js', 'WebGL', 'Wordpress']],
      ['Mobile', ['Android', 'Hybrid Mobile', 'Objective-C', 'Swift', 'Xamarin']],
      ['Data', ['Data Science', 'DBs', 'ElasticSearch', 'MongoDB', 'MySQL and MariaDB', 'PostgreSQL']],
      ['DevOps', ['Clouds', 'Console', 'DevOps', 'Git', 'Linux', 'Maven', 'Microservices', 'Network', 'PowerShell', 'Security']],
      ['IoT', ['Arduino', 'IoT', 'Raspberry Pi']],
      ['Other', [ 'Axure UX', 'Blender', 'Games', 'Jira', 'LaTeX', 'OpenCV', 'Other', 'Project Management', 'Spark', 'Testing', 'Unity', 'Unreal Engine', 'UX Design']]
    ]);
  availableCategories: string[] = [...this.availableCategoriesWithSubcategories.keys()];

  showNewSourceFormControls = false;
  fileToUpload: File = null;

  constructor(
    private sanitizer: DomSanitizer,
    private quickBookInputParserService: QuickBookInputParserService,
    private booksManagerService: BooksManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    if (this.availableTags.indexOf(newTag.value) === -1 && this.book.tags.indexOf(newTag.value) === -1) {
      this.availableTags.push(newTag.value);
      this.selectTag(newTag.value);
    }
    newTag.value = '';
  }

  addNewSource(name: HTMLSelectElement, location: HTMLInputElement): void {
    if (name && location && this.availableSources.indexOf(name.value) !== -1) {
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
      this.toBase64(pastedImage);
      this.removeCover();
      const url = URL.createObjectURL(pastedImage);
      this.book.coverUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if (event.clipboardData.getData('text')) {
      this.book = this.quickBookInputParserService.parse(event.clipboardData.getData('text'));
      console.log('created');
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
    this.booksManagerService.createBook(this.book).subscribe(() => {
      this.router.navigate(['books']);
    });
  }
}
