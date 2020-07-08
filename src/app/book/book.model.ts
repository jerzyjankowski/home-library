export class Book {
  id?: string;
  type: 'paperback'|'video'|'ebook'|'webpage'|null = null;
  title: string;
  coverUrl: string | null;
  publishedYear: string;
  authors: string;
  category: string = null;
  subCategory: string = null;
  tags: string[] = [];
  sources: {name: string; location: string}[] = [];
  mainNote: string;
  starred: boolean;
  recommendation: 'YES'|'NO'|null;
  state: 'fresh'|'current'|'paused'|'finished';

  constructor() {

  }
}
