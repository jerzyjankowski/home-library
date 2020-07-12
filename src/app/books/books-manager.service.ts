import { Injectable } from '@angular/core';
import {Book} from '../book/book.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksManagerService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>('/api/books');
  }

  createBook(book: Book, cover: File): Observable<any> {
    const formData = new FormData();
    book.coverUrl = null;
    formData.append('book', JSON.stringify(book));
    formData.append('cover', cover);
    return this.http.post('/api/books', formData);
  }

  getBook(bookId: string): Observable<Book> {
    return this.http.get<Book>('/api/books/' + bookId);
  }

  updateBook(book: Book, cover: File): Observable<any> {
    const formData = new FormData();
    formData.append('book', JSON.stringify(book));
    formData.append('cover', cover);
    return this.http.put('/api/books/' + book.id, formData);
  }

  getTags(): Observable<Array<string>> {
    return this.http.get<Array<string>>('/api/tags');
  }

  getFilteredBooks(filterAttributes: any): Observable<Array<Book>> {
    console.log('test');
    return this.http.get<Array<Book>>('/api/filter-books', {params: filterAttributes});
  }
}
