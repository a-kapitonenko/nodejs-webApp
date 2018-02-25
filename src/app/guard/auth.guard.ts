import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, RouterStateSnapshot,
    Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { UserRepository } from "../model/user.repository";
import { DialogService } from '../dialog.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()

export class AuthGuard {
    constructor(private userRepository: UserRepository, private dialog: DialogService, public translate:TranslateService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.userRepository.isAuth()) {
            return true;
        } else {
            this.translate.get("BLOCKADD").subscribe(res=>{
                this.dialog.openNotificationDialog(res, 0);
            });
            return false;
        }
    }
}
