import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CreatefanficComponent } from './createfanfic/createfanfic.component';
import { CreateprofileComponent } from './createprofile/createprofile.component';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookRepository } from "./model/book.repository";
import { BookComponent } from './book/book.component';
import { HttpClientModule } from '@angular/common/http';

import { FileDropModule } from 'ngx-file-drop';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';



const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'createfanfic', component: CreatefanficComponent},
	{ path: 'createprofile', component: CreateprofileComponent },

	{
        path: 'books',
        component: BookComponent,
        data: { title: 'Book List' }
    },
    {
        path: 'books/:mode',
        component: BookComponent,
        data: { title: 'Book List' }
    },
    {
        path: 'book-details/:id',
        component: BookDetailComponent,
        data: { title: 'Book Details' }
    },
    {
        path: 'book-create',
        component: BookCreateComponent,
        data: { title: 'Create Book' }
    },
    {
        path: 'book-edit/:id',
        component: BookEditComponent,
        data: { title: 'Edit Book' }
	},
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  	declarations: [AppComponent, NavbarComponent, HomeComponent, CreatefanficComponent, CreateprofileComponent, BookComponent,
		BookDetailComponent,
		BookCreateComponent,
		BookEditComponent],
      imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpClientModule, FileDropModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule],
  	providers: [BookRepository],
  	bootstrap: [AppComponent]
})
export class AppModule { }
