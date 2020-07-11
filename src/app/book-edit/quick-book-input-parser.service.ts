import { Injectable } from '@angular/core';
import {Book} from '../book/book.model';

@Injectable({
  providedIn: 'root'
})
export class QuickBookInputParserService {

  constructor() { }

  public parse(raw: string): Book {
    const book = new Book();
    const rawParts = raw.split('|');
    if (rawParts.length === 13 && rawParts[0] === 'all:::ebook' && rawParts[12] === ':::') {
      book.type = 'ebook';
      book.title = rawParts[1];
      book.rootTitle = rawParts[1];
      book.authors = rawParts[2];
      book.edition = +rawParts[3];
      book.publisher = rawParts[4];
      book.publishedYear = +rawParts[5];
      book.pagesNumber = +rawParts[6];
      book.category = rawParts[7];
      book.subCategory = rawParts[8];
      book.tags = rawParts[9].split(',');
      book.sources = [{name: rawParts[10], location: rawParts[11]}];
    } else {
      book.description = raw;
    }
    return book;
  }
}
