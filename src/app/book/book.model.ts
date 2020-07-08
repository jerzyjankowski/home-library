export class Book {
  id?: string;
  type: 'paperback'|'video'|'ebook'|'webpage';
  title: string;
  coverUrl: string | null;
  publishedYear: string;
  authors: string;
  category: string = null;
  subCategory: string = null;
  tags: string[] = [];
  source: string;
  mainNote: string;
  starred: boolean;
  recommendation: 'YES'|'NO'|null;
  state: 'fresh'|'current'|'paused'|'finished';

  constructor() {

  }
}
