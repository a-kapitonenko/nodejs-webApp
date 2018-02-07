import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserRepository } from '../model/user.repository'
import { User } from '../model/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserRepository]
})
export class LoginComponent {
  private user: User;
  constructor(private serv: UserRepository) { }

  onSubmit(form: NgForm){
      this.user = new User('', form.form.controls.email.value, 'false','ok');
      this.serv.login(this.user).subscribe(data=> {
        console.log(data);
      });
  }
}
