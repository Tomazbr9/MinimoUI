import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { User } from "../model/user";
import { LoginResponse } from "../interface/loginResponse";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:8080/v1/auth';

    constructor(private http: HttpClient){}

    login(user: User): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.apiUrl}/login`, { ...user }
        ).pipe(
            tap(response => {
                localStorage.setItem('access_token', response.token);
            })
        )
    }

    register(user: User): Observable<string> {
        const body = { ...user, role: 'ROLE_USER' };
        return this.http.post(`${this.apiUrl}/register`, body, { responseType: 'text' });
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }


}