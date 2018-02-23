import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, RouterStateSnapshot,
    Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { UserRepository } from "../model/user.repository";
import { DialogService } from '../dialog.service'

@Injectable()

export class AuthGuard {
    constructor(private userRepository: UserRepository, private dialog: DialogService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.userRepository.isAuth()) {
            return true;
        } else {
            this.dialog.openNotificationDialog("Для создания фанфиков войдите в систему", 0);
            return false;
        }
    }
}
