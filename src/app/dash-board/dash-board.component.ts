import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user.model';
import { UserRepository } from '../model/user.repository';

@Component({
  	selector: 'app-dash-board',
  	templateUrl: './dash-board.component.html',
  	styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit{
	selectedUsers = [];
	users: any = [];
	dataSource: any;
	displayedColumns = ["check", "username", "email", "role", "isBlocked"];
	@ViewChild(MatSort) sort: MatSort;
	constructor(private userRepository: UserRepository) {
		this.userRepository.getUsers().subscribe(data => {
			this.users = data;
			this.dataSource = new MatTableDataSource(this.users);
			this.dataSource.sort = this.sort;
		});
	}
	getUsers() {
		this.userRepository.getUsers().subscribe(data => {
			this.users = data;
			this.dataSource = new MatTableDataSource(this.users);
			this.dataSource.sort = this.sort;
		});
	}
	checkUser(user) {
		if(this.selectedUsers.length != 0){
			if(this.selectedUsers.indexOf(user) != -1) {
				this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
			}else {
				this.selectedUsers.push(user);
			}
		}else {
			this.selectedUsers.push(user);
		}
	}
	blockUser() {
		console.log("11");
		this.userRepository.blockUser(this.selectedUsers).subscribe(data => {
			this.getUsers();
			console.log("22");
		});
	}
	unblockUser() {
		this.userRepository.unblockUser(this.selectedUsers).subscribe(data => {
			this.getUsers();
		});
	}
	setAdmin() {
		this.userRepository.setAdmin(this.selectedUsers).subscribe(data => {
			this.getUsers();
		});
	}
	deleteUser() {
		this.userRepository.deleteUser(this.selectedUsers).subscribe(data => {
			this.getUsers();
		});
	}
	ngOnInit() {
		
	}
}
