import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserRepository } from '../model/user.repository'
import { User } from '../model/user.model'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserRepository]
})
export class SignUpComponent {
  private user: User;
  constructor(private serv: UserRepository) { }

  onSubmit(form: NgForm){
      this.user = new User(form.form.controls.name.value,form.form.controls.email.value,'false','ok');
      this.serv.createUser(this.user).subscribe(data=> {
        console.log(data);
      });
  }
}
