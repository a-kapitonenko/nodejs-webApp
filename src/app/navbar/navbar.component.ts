import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";
import { FullscreenService } from '../fullscreen.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../model/user.model';
import { UserRepository } from '../model/user.repository';

@Component({
  	selector: 'app-navbar',
  	templateUrl: './navbar.component.html',
  	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  fullscreen$ :boolean;

  ngOnInit() {
  const subscription = this.fullScreenService.fullscreen$
    .subscribe((fullscreen$) => {
      this.fullscreen$ = fullscreen$;
    });
  this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
  this.subscriptions
    .forEach(s => s.unsubscribe());
  }

  constructor(private router: Router,private repository: BookRepository, 
    private fullScreenService: FullscreenService, private userRepository: UserRepository) { 

  }

  get categories():string[]{
    return this.repository.getCategories();
  }
}