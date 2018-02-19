import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserRepository } from '../model/user.repository'
import { User } from '../model/user.model'

@Component({
  	selector: 'app-signup',
  	templateUrl: './signup.component.html',
  	styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  	private user: User;
  	constructor(private serv: UserRepository) { }
 	onSubmit(form: NgForm){
		var data = form.form.controls;
		this.user = new User(data.email.value, data.password.value, data.name.value);
    	this.serv.createUser(this.user).subscribe(data=> {
        	console.log(data);
    	});
  	}
}
