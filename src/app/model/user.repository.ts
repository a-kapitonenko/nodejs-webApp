import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './user.model';
   
@Injectable()
export class UserRepository{
    private User: User = null;
    private Users: any = [];
    constructor(private http: HttpClient){}
    createUser(user: User){
        return this.http.post('/registeruser', user); 
    }
    login(user: User){
        return this.http.post('/login', user);
    }
}