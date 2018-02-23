import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './user.model';
import { Observable } from "rxjs/Observable";
   
@Injectable()
export class UserRepository {
    public selectedUser: any; 
    private users: any = [];
    constructor(private http: HttpClient) {
        this.http.get('/selectuser').subscribe(data => {
            if(data != null) {
                this.selectedUser = data;
            }else {
                this.selectedUser = null;
            }
        });
    }
    selectUser(user: User) {
        this.selectedUser = user;
    }
    createUser(user: User) {
        return this.http.post('/registeruser', user); 
    }
    login(user: User) {
        return this.http.post('/login', user);
    }
    isAuth() {
        return this.selectedUser == null? false: true;
    }
    logout() {
        this.http.get('/logout').subscribe();
    }
    getUserName(id: string): Observable<any> {
        return this.http.get('/user/'+id).map(data => {
            return data;
        });        
    }
}