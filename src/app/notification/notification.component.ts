import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  	selector: 'app-notification',
  	templateUrl: './notification.component.html',
  	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	text: string;
	title: any;
	path: any;
	constructor(public dialogRef: MatDialogRef<NotificationComponent>, 
		@Inject(MAT_DIALOG_DATA) public data: any) {
			this.text = data.text;
			if(data.status == 0) {
				this.title = "Warning!";
				this.path = "error";
			} else if(data.status == 1) {
				this.title = "Success!";
				this.path = "check";
			}
		}
  	ngOnInit() {}
	onClose() {
		this.dialogRef.close();
	}
}
