import {SafeResourceUrl} from '@angular/platform-browser';

export class Book {
  id?: string;
  media: 'paperback'|'video'|'ebook'|'webpage'|'notes' = null;

  recommendation: 'recommended'|'neutral'|'notRecommended' = 'neutral';
  state: 'fresh'|'revised'|'current'|'paused'|'finished' = 'fresh';
  marked = false;
  archived = false;

  rootTitle: string;
  title: string;
  authors: string;
  coverUrl: string | SafeResourceUrl | null;
  edition: number;
  publisher: string = null;
  publishedYear: number;
  pagesNumber: number;

  category: string = null;
  subcategory: string = null;
  tags: string[] = [];

  sources: {name: string; location: string}[] = [];

  createdAt: string;
  updatedAt: string;
  lastReadAt: string;

  note: string;
  description: string;

  readings: {date: string; time: number, note: string}[] = [];

  constructor() {

  }
}
