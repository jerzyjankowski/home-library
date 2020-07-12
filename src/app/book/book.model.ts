import {SafeResourceUrl} from '@angular/platform-browser';

export class Book {
  id?: string;
  type: 'paperback'|'video'|'ebook'|'webpage' = null;

  recommendation: 'recommended'|'neutral'|'notRecommended' = 'neutral';
  state: 'fresh'|'current'|'paused'|'finished' = 'fresh';
  starred = false;

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

  readings: {date: string; note: string}[] = [];

  constructor() {

  }
}
