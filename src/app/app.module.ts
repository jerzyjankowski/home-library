import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { BooksSearchboxComponent } from './books-searchbox/books-searchbox.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AttributeOptionComponent } from './attribute-option/attribute-option.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import {CKEditorModule} from 'ckeditor4-angular';
import { ReadingRegisterModalComponent } from './reading-register-modal/reading-register-modal.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AdminComponent } from './admin/admin.component';
import { AddBookElementValueModalComponent } from './add-book-element-value-modal/add-book-element-value-modal.component';
import {FooterComponent} from './footer/footer.component';
import { ReadingHistoryComponent } from './reading-history/reading-history.component';
import { ToastsComponent } from './toasts/toasts.component';
import { AutoClosingButtonComponent } from './toasts/components/auto-closing-button/auto-closing-button.component';
import { ToastNotificationComponent } from './toasts/components/toast-notification/toast-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    BookComponent,
    BooksSearchboxComponent,
    BookEditComponent,
    AttributeOptionComponent,
    AttributeOptionComponent,
    AttributeOptionComponent,
    SpinnerComponent,
    ReadingRegisterModalComponent,
    DatepickerComponent,
    AdminComponent,
    AddBookElementValueModalComponent,
    FooterComponent,
    ReadingHistoryComponent,
    ToastsComponent,
    AutoClosingButtonComponent,
    ToastNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
