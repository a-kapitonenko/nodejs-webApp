import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, RouterStateSnapshot,
    Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { UserRepository } from "../model/user.repository"

@Injectable()

export class AuthGuard {
    constructor(private userRepository: UserRepository) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.userRepository.isAuth()) {
            return true;
        } else {
            alert("Войдите в систему");
            return false;
        }
    }
}
