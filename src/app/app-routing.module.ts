import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksComponent} from './books/books.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import {AdminComponent} from './admin/admin.component';


const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent, pathMatch: 'full' },
  { path: 'books/new', component: BookEditComponent},
  { path: 'books/:book_id/edit', component: BookEditComponent},
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
