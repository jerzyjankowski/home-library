import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookEditModalComponent} from '../book-edit-modal/book-edit-modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-books-searchbox',
  templateUrl: './books-searchbox.component.html',
  styleUrls: ['./books-searchbox.component.scss']
})
export class BooksSearchboxComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onAddBook(): void {
    this.router.navigate(['books', 'new']);
  }
}
