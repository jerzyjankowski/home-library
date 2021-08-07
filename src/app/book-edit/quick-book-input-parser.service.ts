import { Injectable } from '@angular/core';
import {Book} from '../book/book.model';

@Injectable({
  providedIn: 'root'
})
export class QuickBookInputParserService {

  constructor() { }

  public parseAndUpdateBookWithRaw(bookToUpdate: Book, raw: string): void {
    const rawParts = raw.split('|');
    const lines = raw.split('\n');
    if (rawParts.length === 13 && rawParts[0] === 'all:::ebook' && rawParts[12] === ':::') {
      bookToUpdate.media = 'ebook';
      bookToUpdate.title = rawParts[1];
      bookToUpdate.rootTitle = rawParts[1];
      bookToUpdate.authors = rawParts[2];
      bookToUpdate.edition = +rawParts[3];
      bookToUpdate.publisher = rawParts[4];
      bookToUpdate.publishedYear = +rawParts[5];
      bookToUpdate.pagesNumber = +rawParts[6];
      bookToUpdate.category = rawParts[7];
      bookToUpdate.subcategory = rawParts[8];
      bookToUpdate.tags = rawParts[9].split(',');
      bookToUpdate.sources = [{name: rawParts[10], location: rawParts[11]}];
    } else if (lines.length === 7) {
      bookToUpdate.media = 'ebook';
      bookToUpdate.title = lines[0];
      bookToUpdate.rootTitle = lines[0];
      bookToUpdate.authors = lines[1];
      bookToUpdate.edition = 1;
      bookToUpdate.publisher = lines[4];
      bookToUpdate.publishedYear = +lines[2];
      bookToUpdate.pagesNumber = +lines[3];
      bookToUpdate.sources = [{name: lines[5], location: ''}];
    } else {
      bookToUpdate.description = raw;
    }
  }
}
