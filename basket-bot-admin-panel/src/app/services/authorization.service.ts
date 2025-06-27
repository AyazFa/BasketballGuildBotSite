import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router ) { }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  login(userInfo: {email: string, password: string}) : Observable<string | boolean> {
    if (userInfo.email === 'admin@admin.ru' && userInfo.password === 'admin123') {
        this.setToken('myTokenForBasketBotApiAuth')
        return of(true)
    }
    return throwError(() => new Error('Login failed'))
  }

  logout() {
    if (confirm('Do you really want to logout?')){
      localStorage.removeItem('token')
    }
    this.router.navigate(['login'])
  }
}
