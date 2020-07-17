import { Injectable } from '@angular/core';
import {Book} from '../book/book.model';

@Injectable({
  providedIn: 'root'
})
export class QuickBookInputParserService {

  constructor() { }

  public parseAndUpdateBookWithRaw(bookToUpdate: Book, raw: string): void {
    const rawParts = raw.split('|');
    if (rawParts.length === 13 && rawParts[0] === 'all:::ebook' && rawParts[12] === ':::') {
      bookToUpdate.type = 'ebook';
      bookToUpdate.title = rawParts[1];
      bookToUpdate.rootTitle = rawParts[1];
      bookToUpdate.authors = rawParts[2];
      bookToUpdate.edition = +rawParts[3];
      bookToUpdate.publisher = rawParts[4];
      bookToUpdate.publishedYear = +rawParts[5];
      bookToUpdate.pagesNumber = +rawParts[6];
      bookToUpdate.category = rawParts[7];
      bookToUpdate.subCategory = rawParts[8];
      bookToUpdate.tags = rawParts[9].split(',');
      bookToUpdate.sources = [{name: rawParts[10], location: rawParts[11]}];
    } else {
      bookToUpdate.description = raw;
    }
  }
}
