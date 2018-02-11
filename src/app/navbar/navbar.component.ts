import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { FullscreenService } from '../fullscreen.service';
import { Subscription } from 'rxjs/Subscription';
=======
import { Book } from '../model/book.model';
import { BookRepository } from '../model/book.repository';
import { User } from '../model/user.model'
import { UserRepository } from '../model/user.repository'
>>>>>>> 1888e4047f0179856680e87ff4aa0a0baab96308

@Component({
  	selector: 'app-navbar',
  	templateUrl: './navbar.component.html',
  	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
<<<<<<< HEAD
  private subscriptions: Subscription[] = [];
  fullscreen$ :boolean;

  ngOnInit() {
  const subscription = this.fullScreenService.fullscreen$
    .subscribe((fullscreen$) => {
      this.fullscreen$ = fullscreen$;
    });
  console.log(this.fullscreen$);
  this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
  this.subscriptions
    .forEach(s => s.unsubscribe());
  }

  constructor(private router: Router,private repository: BookRepository, 
    private fullScreenService: FullscreenService) { 

  }

  get categories():string[]{
    return this.repository.getCategories();
  }
=======
	constructor(private router: Router, private repository: BookRepository, public userRepository: UserRepository) {
	}
  	get categories():string[]{
    	return this.repository.getCategories();
  	}
  	ngOnInit() { }
>>>>>>> 1888e4047f0179856680e87ff4aa0a0baab96308
}