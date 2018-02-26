import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user.model';
import { UserRepository } from '../model/user.repository';
import { Router } from '@angular/router';

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
	constructor(private userRepository: UserRepository, private router: Router) {
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
		if(this.selectedUsers.length != 0) {
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
		this.userRepository.blockUser(this.selectedUsers).subscribe(data => {
			this.getUsers();
			this.clearSelectedUsers();
		});
	}
	unblockUser() {
		this.userRepository.unblockUser(this.selectedUsers).subscribe(data => {
			this.getUsers();
			this.clearSelectedUsers();
		});
	}
	setAdmin() {
		this.userRepository.setAdmin(this.selectedUsers).subscribe(data => {
			this.getUsers();
			this.clearSelectedUsers();
		});
	}
	deleteUser() {
		this.userRepository.deleteUser(this.selectedUsers).subscribe(data => {
			this.getUsers();
			this.clearSelectedUsers();
		});
	}
	onRowClicked(row) {
		this.router.navigate(['/profile/',row._id]);
	}
	clearSelectedUsers() {
		this.selectedUsers = [];
	}
	ngOnInit() {
		
	}
}
