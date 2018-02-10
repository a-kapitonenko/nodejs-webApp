import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book.model';
import { BookRepository } from '../model/book.repository';
import { User } from '../model/user.model'
import { UserRepository } from '../model/user.repository'

@Component({
  	selector: 'app-navbar',
  	templateUrl: './navbar.component.html',
  	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	constructor(private router: Router, private repository: BookRepository, public userRepository: UserRepository) {
	}
  	get categories():string[]{
    	return this.repository.getCategories();
  	}
  	ngOnInit() { }
}