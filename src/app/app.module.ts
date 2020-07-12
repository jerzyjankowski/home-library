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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AttributeOptionComponent } from './attribute-option/attribute-option.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import {CKEditorModule} from 'ckeditor4-angular';
import { ReadingRegisterModalComponent } from './reading-register-modal/reading-register-modal.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    BookComponent,
    BooksSearchboxComponent,
    BookEditModalComponent,
    BookEditComponent,
    AttributeOptionComponent,
    AttributeOptionComponent,
    AttributeOptionComponent,
    SpinnerComponent,
    ReadingRegisterModalComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
