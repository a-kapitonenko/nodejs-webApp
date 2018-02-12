import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserRepository } from '../model/user.repository'
import { User } from '../model/user.model'

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  	private user: User;
  	constructor(private userrepository: UserRepository) { }
  	onSubmit(form: NgForm){
    	var data = form.form.controls;
      	this.user = new User(data.email.value, data.password.value);
      	this.userrepository.login(this.user).subscribe(res=> {
			if (res["send"]) {
				console.log((res["send"]));
			}else {
				this.userrepository.selectUser(res);
			}
      	});
	}
}
