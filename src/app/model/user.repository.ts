import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './user.model';
   
@Injectable()
export class UserRepository {
    private selectedUser: User;
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
    logout() {
        this.http.get('/logout').subscribe();
    }
}