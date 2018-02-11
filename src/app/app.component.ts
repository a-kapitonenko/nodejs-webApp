import { Component } from '@angular/core';
import { UserRepository } from './model/user.repository'

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private repository: UserRepository) { 
	}
}
