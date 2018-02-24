import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { UserRepository } from '../model/user.repository';
import { User } from '../model/user.model';
import { DialogService } from '../dialog.service';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  	private user: User;
  	constructor(private userrepository: UserRepository, private router: Router, private dialog: DialogService) { }
  	onSubmit(form: NgForm){
    	var data = form.form.controls;
      	this.user = new User(data.email.value, data.password.value);
      	this.userrepository.login(this.user).subscribe(data=> {
			if (data["text"]) {
				this.dialog.openNotificationDialog(data["text"], data["status"]);
			}else {
				this.userrepository.selectUser(data);
				this.router.navigate(['']);
			}
      	});
	}
}
