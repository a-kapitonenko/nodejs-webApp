import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserRepository } from './model/user.repository'
import { CreatefanficComponent } from './createfanfic/createfanfic.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'createfanfic', component: CreatefanficComponent},
	{ path: 'signup', component: SignUpComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  	declarations: [AppComponent, NavbarComponent, HomeComponent, CreatefanficComponent, SignUpComponent, LoginComponent],
  	imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpClientModule],
  	providers: [UserRepository],
  	bootstrap: [AppComponent]
})
export class AppModule { }
