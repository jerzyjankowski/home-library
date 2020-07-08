import {SafeResourceUrl} from '@angular/platform-browser';

export class Book {
  id?: string;
  type: 'paperback'|'video'|'ebook'|'webpage'|null = null;

  recommendation: 'YES'|'NO'|null;
  state: 'fresh'|'current'|'paused'|'finished';
  starred: boolean;

  rootTitle: string;
  title: string;
  authors: string;
  coverUrl: string | SafeResourceUrl | null;
  edition: number;
  publisher: string;
  publishedYear: number;
  pagesNumber: number;

  category: string = null;
  subCategory: string = null;
  tags: string[] = [];

  sources: {name: string; location: string}[] = [];

  note: string;
  description: string;

  constructor() {

  }
}
