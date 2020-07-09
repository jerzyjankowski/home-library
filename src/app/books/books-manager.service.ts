import { Injectable } from '@angular/core';
import {Book} from '../book/book.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksManagerService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>('/api/');
  }

  createBook(book: Book): Observable<any> {
    console.log('creating');
    return this.http.post('/api/', book);
  }
}
