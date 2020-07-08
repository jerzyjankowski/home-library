import { Injectable } from '@angular/core';
import {Book} from '../book/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksManagerService {
  getBooks(): Book[] {
    const books: Book[] = [];
    books.push(this.createSampleBook1());
    books.push(this.createSampleBook2());
    books.push(this.createSampleBook3());
    books.push(this.createSampleBook4());
    return [...books];
  }

  private createSampleBook1(): Book {
    return {
      id: '1', type: 'ebook', title: 'Testing Angular Applications',
      coverUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfCfov7RJvzMo0Bf00FyCcG0_w5a00-dpZYuaTV3dEWmRueMjY',
      publishedYear: '2018', authors: 'Jesse Palmer, Corinna Cohn, Michael Giambalvo, Craig Nishina',
      category: 'FE', subCategory: 'Angular',
      tags: ['Angular', 'Protractor', 'Karma', 'Jasmine'],
      source: 'Manning (offline)',
      mainNote: 'Testing Angular Applications is an example-rich, hands-on guide that gives you the real-world techniques you need to thoroughly test all parts of your Angular applications. By the end of this book, you\'ll be able to confidently write unit and end-to-end tests for Angular applications in TypeScript.',
      starred: true, recommendation: 'YES', state: 'current'
    };
  }
  private createSampleBook2(): Book {
    return {
      id: '2', type: 'ebook', title: 'Angular in Action',
      coverUrl: 'https://images.manning.com/360/480/resize/book/d/429f68a-5162-4798-853e-4cb04f91bc63/Wilken-Angular-HI.png',
      publishedYear: '2018', authors: 'Jeremy Wilken',
      category: 'FE', subCategory: 'Angular',
      tags: ['Angular', 'TypeScript'],
      source: 'Manning (offline)',
      mainNote: 'Angular in Action teaches you everything you need to build production-ready Angular applications.Thoroughly practical and packed with tricks and tips, this hands-on tutorial is perfect for web devs ready to build web applications that can handle whatever you throw at them.',
      starred: false, recommendation: null, state: 'finished'
    };
  }
  private createSampleBook3(): Book {
    return {
      id: '3', type: 'paperback', title: 'Vue.js in Action',
      coverUrl: 'https://images.manning.com/360/480/resize/book/6/05e34f7-78d5-4f95-8d3c-2e47cb474cb9/Hanchett-Vue-HI.png',
      publishedYear: '2018', authors: 'Erik Hanchett with Benjamin Listwon',
      category: 'FE', subCategory: 'VueJS',
      tags: ['Vue.js'],
      source: 'Manning (offline)',
      mainNote: 'Web pages are rich with data and graphics, and it\'s challenging to maintain a smooth and quick user experience. Vue.js in Action teaches you how to build a fast, flowing web UI with the Vue.js framework. As you move through the book, you\'ll put your skills to practice by building a complete web store application with product listings, a checkout process, and an administrative interface.',
      starred: false, recommendation: null, state: 'fresh'
    };
  }
  private createSampleBook4(): Book {
    return {
      id: '4', type: 'video', title: 'The Complete 2020 Web Development Bootcamp',
      coverUrl: null,
      publishedYear: '2020', authors: 'Angela Yu',
      category: 'FE', subCategory: 'General',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Node', 'React', 'MongoDB'],
      source: 'Udemy (online)',
      mainNote: '',
      starred: false, recommendation: 'NO', state: 'paused'
    };
  }
  constructor() { }
}
