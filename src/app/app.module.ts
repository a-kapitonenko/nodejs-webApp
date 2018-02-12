import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserRepository } from './model/user.repository'
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookRepository } from "./model/book.repository";
import { BookComponent } from './book/book.component';

import { FileDropModule } from 'ngx-file-drop';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { TinyMceModule } from 'angular-tinymce';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { BookReadComponent } from './book-read/book-read.component';

import { FullscreenService } from './fullscreen.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { User } from './model/user.model';

const appRoutes: Routes =[
    { path: '', component: HomeComponent},
	{ path: 'signup', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', redirectTo: '/' },

	{
        path: 'books',
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
    {
        path: 'book-read/:id/:num',
        component: BookReadComponent,
        data: { title: 'Read Book' }
    },
    {
        path: 'add-chapter/:id',
        component: AddChapterComponent,
        data: { title: 'Write Book' }
	},
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  	declarations: [AppComponent, NavbarComponent, HomeComponent, SignUpComponent, LoginComponent, BookComponent,
		BookDetailComponent,
		BookCreateComponent,
		BookEditComponent,
		AddChapterComponent,
		BookReadComponent],
      imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpClientModule, FileDropModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        TinyMceModule.forRoot({
            tinymceScriptURL: 'assets/tinymce/tinymce.min.js',
            baseURL: '',
            skin_url: '/assets/tinymce/skins/lightgray',
            theme_url: '/assets/tinymce/themes/modern/theme.min.js',
            selector: 'angular-tinymce',
            plugins: ['textpattern'],
            textpattern_patterns: [
               {start: '*', end: '*', format: 'italic'},
               {start: '**', end: '**', format: 'bold'},
               {start: '#', format: 'h1'},
               {start: '##', format: 'h2'},
               {start: '###', format: 'h3'},
               {start: '####', format: 'h4'},
               {start: '#####', format: 'h5'},
               {start: '######', format: 'h6'},
               {start: '1. ', cmd: 'InsertOrderedList'},
               {start: '* ', cmd: 'InsertUnorderedList'},
               {start: '- ', cmd: 'InsertUnorderedList'}
            ]
        }), MatProgressBarModule],
  	providers: [BookRepository, UserRepository, FullscreenService],
  	bootstrap: [AppComponent]
})
export class AppModule { }
