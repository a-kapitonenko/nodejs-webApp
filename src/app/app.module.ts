import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CreatefanficComponent } from './createfanfic/createfanfic.component';
import { CreateprofileComponent } from './createprofile/createprofile.component';

const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'createfanfic', component: CreatefanficComponent},
	{ path: 'createprofile', component: CreateprofileComponent },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  	declarations: [AppComponent, NavbarComponent, HomeComponent, CreatefanficComponent, CreateprofileComponent],
  	imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  	providers: [],
  	bootstrap: [AppComponent]
})
export class AppModule { }
