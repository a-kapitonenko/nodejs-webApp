import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from './notification/notification.component';

@Injectable()
export class DialogService {
    constructor(private dialog: MatDialog) {}
    openNotificationDialog(data: string, status: any) {
        var dialogRef = this.dialog.open(NotificationComponent, {
            width: '400px',
            data:{
                text: data,
                status: status
            }
        });
        dialogRef.afterClosed().subscribe();
    }
}