import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {       //this.authservice.currentUserValue.schoolId
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.baseUrl}/login`, { username, password })
            .pipe(map(res => {
                if (res.isError === false) {
                    if (res.data && res.data.authToken) {
                        localStorage.setItem('currentUser', JSON.stringify(res.data));
                        this.currentUserSubject.next(res.data);
                    }
                    if (this.currentUserValue.notification > 0) {
                        localStorage.setItem('seen', '0');
                    }
                    return res.data;
                }
                else {
                    // Wrong password alert
                    // Swal.fire({
                    //     title: 'Error!',
                    //     text: res.message,
                    // })
                    this.router.navigate(["/"]);
                }
            }));
    }
    changePassword(password: string, userId: string) {
        return this.http.post<any>(`${environment.baseUrl}/ResetPasswordByAdmin`, { password, userId });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}