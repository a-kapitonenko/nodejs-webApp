import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogModule } from'@angular/material';
import { MatTableModule } from'@angular/material';
import { MatSortModule } from '@angular/material';

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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommentsService} from './comments.service';
import {WebsocketService} from './websocket.service';
import {InterfaceService} from './model/interface.service';

import {ImageuploadService} from './imageUpload.service';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookTagComponent } from './book-tag/book-tag.component'; 
import { BarRatingModule } from "ngx-bar-rating";
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './guard/auth.guard';
import { NotificationComponent } from './notification/notification.component';
import { DialogService } from './dialog.service';
import { ProfileComponent } from './profile/profile.component';

import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { DateService } from './date.service';
import { DashBoardComponent } from './dash-board/dash-board.component';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const appRoutes: Routes =[
    { 
        path: '', 
        component: HomeComponent
    },
	{ 
        path: 'signup', 
        component: SignUpComponent 
    },
    { 
        path: 'login', 
        component: LoginComponent,
        data: { title: 'Войти' } 
    },
    { 
        path: 'logout', 
        redirectTo: '/' 
    },
    { 
        path: 'dashboard', 
        component: DashBoardComponent, 
        data: { title: 'DashBoard' } 
    },
	{ 
        path: 'books/:tagId', 
        component: BookTagComponent, 
        data: { title: 'Book List' } 
    },
    {
        path: 'search/:text',
        component: SearchComponent,
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
        canActivate: [AuthGuard],
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
  	declarations: [AppComponent, NavbarComponent, HomeComponent, SignUpComponent, LoginComponent, 
		BookDetailComponent,
		BookCreateComponent,
		BookEditComponent,
		AddChapterComponent,
		BookReadComponent,
		BookTagComponent,
		SearchComponent,
		NotificationComponent,
		ProfileComponent,
		DashBoardComponent],
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpClientModule, FileDropModule,
        AngularFireModule.initializeApp(environment.firebase), AngularFireStorageModule,
        TinyMceModule.forRoot(environment.tinyMce), MatProgressBarModule, MatProgressSpinnerModule, 
        TagInputModule, BrowserAnimationsModule, MatDialogModule,
        ReactiveFormsModule, BarRatingModule, MatTableModule, InlineEditorModule,MatSortModule,MatFormFieldModule,
        MatInputModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })],
    entryComponents: [NotificationComponent],
    providers: [BookRepository, UserRepository, FullscreenService, CommentsService, 
        WebsocketService, ImageuploadService, InterfaceService, AuthGuard, DialogService,DateService],
  	bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}