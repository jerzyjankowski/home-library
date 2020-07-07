export interface Book {
  id?: string;
  title: string;
  coverUrl: string | null;
  publishedYear: string;
  authors: string;
  sourceType: 'paperback'|'video'|'ebook'|'webpage';
  category: string;
  tags: string[];
  source: string;
  mainNote: string;
  starred: boolean;
  recommendation: -1|0|1;
  state: 'fresh'|'current'|'paused'|'finished';
}
