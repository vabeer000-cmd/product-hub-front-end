import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';


@Injectable({
  providedIn: 'root',
})
export class Auth {

  private http = inject(HttpClient);

  private readonly authUrl = `${environment.apiUrl}/v1/auth`;

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.authUrl}/login`, request)
      .pipe(
        tap(response => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage. setItem('refreshToken', response.refreshToken);
          localStorage.setItem('userId',String(response.userId));
          localStorage.setItem('username',response.username);
          localStorage.setItem('role',response.role)
        })
      );
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      `${this.authUrl}/register`,
      request
    );
  }

  productOwnerRegister(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      `${this.authUrl}/product-owners/register`,
        request
    );
  }

  logout(): Observable<void> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http
      .post<void>(
        `${this.authUrl}/logout`,
        { refreshToken }
      )
      .pipe(
        finalize(() =>{
          this.clearTokens()
        })
      );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  refreshToken(): Observable<LoginResponse> {
  const refreshToken = localStorage.getItem('refreshToken');

  return this.http
    .post<LoginResponse>(
      `${this.authUrl}/refresh`,
      { refreshToken }
    )
    .pipe(
      tap(response => {
        localStorage.setItem(
          'accessToken',
          response.accessToken
        );

        localStorage.setItem(
          'refreshToken',
          response.refreshToken
        );
        localStorage.setItem('userId', String(response.userId));
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
      })
    );
}

clearTokens(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
   localStorage.removeItem('username')
    localStorage.removeItem('role')
}

getRole():String|null{
  return localStorage.getItem('role');
}

canManageProducts(): boolean {
  const role = this.getRole();
  return role === 'ADMIN' || role === 'PRODUCTOWNER';
}


getUserId(): number | null {
  const userId = localStorage.getItem('userId');
  return userId === null ? null : Number(userId);
}

  isLoggedIn():boolean{
    return !! this.getAccessToken();
  }

}