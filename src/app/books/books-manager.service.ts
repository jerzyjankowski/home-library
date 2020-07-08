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
      id: '1', type: 'ebook', recommendation: 'YES', state: 'current', starred: true,
      rootTitle: 'Testing Angular Applications', title: 'Testing Angular Applications, 2nd edition',
      authors: 'Jesse Palmer, Corinna Cohn, Michael Giambalvo, Craig Nishina',
      coverUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfCfov7RJvzMo0Bf00FyCcG0_w5a00-dpZYuaTV3dEWmRueMjY',
      edition: 2, publisher: 'Manning', publishedYear: 2018, pagesNumber: 250,
      category: 'Frontend', subCategory: 'Angular',
      tags: ['Angular', 'Protractor', 'Karma', 'Jasmine'],
      sources: [{name: 'Manning', location: 'offline'}],
      note: 'Good book',
      description: 'Testing Angular Applications is an example-rich, hands-on guide that gives you the real-world techniques you need to thoroughly test all parts of your Angular applications. By the end of this book, you\'ll be able to confidently write unit and end-to-end tests for Angular applications in TypeScript.'
    };
  }
  private createSampleBook2(): Book {
    return {
      id: '2', type: 'ebook', recommendation: null, state: 'finished', starred: false,
      rootTitle: 'Angular in Action', title: 'Angular in Action',
      authors: 'Jeremy Wilken',
      coverUrl: 'https://images.manning.com/360/480/resize/book/d/429f68a-5162-4798-853e-4cb04f91bc63/Wilken-Angular-HI.png',
      edition: 1, publisher: '', publishedYear: 2018, pagesNumber: 300,
      category: 'Frontend', subCategory: 'Angular',
      tags: ['Angular', 'TypeScript'],
      sources: [{name: 'Manning', location: 'offline'}],
      note: 'Good for beginners',
      description: 'Angular in Action teaches you everything you need to build production-ready Angular applications.Thoroughly practical and packed with tricks and tips, this hands-on tutorial is perfect for web devs ready to build web applications that can handle whatever you throw at them.'
    };
  }
  private createSampleBook3(): Book {
    return {
      id: '3', type: 'paperback', recommendation: null, state: 'fresh', starred: false,
      rootTitle: 'Vue.js in Action', title: 'Vue.js in Action',
      authors: 'Erik Hanchett with Benjamin Listwon',
      coverUrl: 'https://images.manning.com/360/480/resize/book/6/05e34f7-78d5-4f95-8d3c-2e47cb474cb9/Hanchett-Vue-HI.png',
      edition: 1, publisher: '', publishedYear: 2018, pagesNumber: 350,
      category: 'Frontend', subCategory: 'VueJS',
      tags: ['VueJS'],
      sources: [{name: 'Manning', location: 'offline'}],
      note: '',
      description: 'Web pages are rich with data and graphics, and it\'s challenging to maintain a smooth and quick user experience. Vue.js in Action teaches you how to build a fast, flowing web UI with the Vue.js framework. As you move through the book, you\'ll put your skills to practice by building a complete web store application with product listings, a checkout process, and an administrative interface.'
    };
  }
  private createSampleBook4(): Book {
    return {
      id: '4', type: 'video', recommendation: 'NO', state: 'paused', starred: false,
      rootTitle: 'The Complete 2020 Web Development Bootcamp', title: 'The Complete 2020 Web Development Bootcamp',
      authors: 'Angela Yu',
      coverUrl: null,
      edition: 1, publisher: 'udemy', publishedYear: 2020, pagesNumber: 340,
      category: 'Frontend', subCategory: 'General',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Node', 'React', 'MongoDB'],
      sources: [{name: 'Udemy', location: 'online: www.udemy.com/asdfo80'}],
      note: 'First 60 videos are too basic, maybe later will be greater',
      description: ''
    };
  }
  // private createSampleBook(): Book {
  //   return {
  //     id: '', type: 'ebook', recommendation: , state: '', starred: ,
  //     rootTitle: '',
  //     title: '',
  //     authors: '',
  //     coverUrl: '',
  //     edition: , publisher: '', publishedYear: , pages: ,
  //     category: '', subCategory: '',
  //     tags: [''],
  //     sources: [{name: '', location: ''}],
  //     mainNote: '',
  //     description: ''
  //   };
  // }
  constructor() { }
}
