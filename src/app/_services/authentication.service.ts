import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from '../_models';

@Injectable()
export class AuthenticationService {
    AlertMessage: any;
    loginerrormsg: boolean;
    private currentUserSubject: BehaviorSubject<user>;
    public currentUser: Observable<user>;


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();


     }

     public get currentUserValue(): user {
        return this.currentUserSubject.value;
    }
    
    login(username: string, password: string) {
        return this.http.post<any>(`http://wmsapi.jayits.com/Customer.svc/Login`, { Username: username, Password: password })
            .pipe(map(user => {
                debugger ;
                var respData=user.m;


                if(user.s ==0){
                    this.AlertMessage=respData;
                    this.loginerrormsg=true;

                }
                // login successful if there's a jwt token in the response
                if (user && user.Data.Token) {
					user = user.Data;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    
                    localStorage.setItem('currentUser', JSON.stringify(user));

					localStorage.setItem('Token', user.Token);
                    localStorage.setItem('Role', user.RoleId);
                    localStorage.setItem('UserId', user.UserId);
                    localStorage.setItem('Username', user.UserName);
                    this.currentUserSubject.next(user);
                }
               
                    return user;

              
            }));
    }

setRole(RoleId){
    localStorage.setItem('Role',RoleId);
}

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

        localStorage.clear();

    }
}