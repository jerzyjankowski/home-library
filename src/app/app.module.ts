import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { BooksSearchboxComponent } from './books-searchbox/books-searchbox.component';
import { BookEditModalComponent } from './book-edit-modal/book-edit-modal.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    BookComponent,
    BooksSearchboxComponent,
    BookEditModalComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
