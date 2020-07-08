import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Book} from '../book/book.model';

// Pasting image based on Ben Nadel's work:
// https://www.bennadel.com/blog/3630-pasting-images-into-your-app-using-file-blobs-and-url-createobjecturl-in-angular-7-2-15.htm
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  public imageUrls: SafeUrl[];
  private lastObjectUrl: string;

  book: Book = new Book();
  types = ['ebook', 'paperback', 'webpage', 'video'];
  tags = ['Angular', 'CSS3', 'HTML5', 'Jasmine', 'JavaScript', 'Karma', 'MongoDB', 'Node', 'Protractor', 'React', 'TypeScript', 'Vue.js'];
  categories: Map<string, string[]> = new Map([
      ['Backend', ['C lang', 'C#', 'C++', 'Django', 'dotNET', 'Flask', 'Go', 'Groovy', 'Java', 'JavaFX', 'Node.js', 'PHP', 'Python', 'R', 'Rails', 'Ruby', 'Scala', 'Spring']],
      ['Frontend', ['Angular', 'AngularJS', 'Bootstrap', 'HTML and CSS', 'JavaScript', 'jQuery', 'MeteorJS', 'ReactJS', 'TypeScript', 'Vue.js', 'WebGL', 'Wordpress']],
      ['Mobile', ['Android', 'Hybrid Mobile', 'Objective-C', 'Raspberry Pi', 'Swift', 'Xamarin']],
      ['Data', ['Data Science', 'DBs', 'ElasticSearch', 'MongoDB', 'MySQL and MariaDB', 'PostgreSQL']],
      ['DevOps', ['Clouds', 'Console', 'DevOps', 'Git', 'Linux', 'Maven', 'Microservices', 'Network', 'PowerShell', 'Security']],
      ['IoT', ['Arduino', 'IoT']],
      ['Other', [ 'Axure UX', 'Blender', 'Games', 'Jira', 'LaTeX', 'OpenCV', 'Other', 'Project Management', 'Spark', 'Testing', 'Unity', 'Unreal Engine', 'UX Design']]
    ]);
  mainCategories: string[] = [...this.categories.keys()];

  constructor(private sanitizer: DomSanitizer) {
    this.imageUrls = [];
    this.lastObjectUrl = '';
  }

  ngOnInit(): void {
  }

  public handlePaste(event: ClipboardEvent): void {
    const pastedImage = this.getPastedImage(event);
    if (!pastedImage) {
      return;
    }
    if (this.lastObjectUrl) {
      URL.revokeObjectURL(this.lastObjectUrl);
    }
    this.lastObjectUrl = URL.createObjectURL(pastedImage);
    this.imageUrls.unshift(
      this.sanitizer.bypassSecurityTrustUrl(this.lastObjectUrl)
    );
  }

  private getPastedImage(event: ClipboardEvent): File | null {
    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files.length &&
      this.isImageFile( event.clipboardData.files[0])
    ) {
      return(event.clipboardData.files[ 0 ]);
    }
    return(null);
  }

  private isImageFile(file: File): boolean {
    return(file.type.search( /^image\//i ) === 0);
  }
}
