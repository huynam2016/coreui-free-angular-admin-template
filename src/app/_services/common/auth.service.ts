import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { BASE_URI } from '../uri';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =  BASE_URI + '/Token'
  private tokenKey = 'tokenTienTho';
  constructor(private httpClient: HttpClient, private router: Router) {}
   // Xử lý lỗi
    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'Đã xảy ra lỗi!';
      if (error.error instanceof ErrorEvent) {
        // Lỗi phía client
        errorMessage = `Lỗi: ${error.error.message}`;
      } else {
        // Lỗi phía server
        errorMessage = `Mã lỗi: ${error.status}\nMessage: ${error.message}`;
      }

      console.error(errorMessage);
      return throwError(() => errorMessage);
    }
  login(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data).pipe(
      map((res: any) => {
        if (res.IsSuccess) {
          localStorage.setItem(this.tokenKey, res.Data);
          this.router.navigate(['./dashboard']);
        }
        return res;
      }),
      catchError(this.handleError)
    );
  }
  isLoggedIn = () => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };
  getUser = () => {
    const token = this.getToken();
    if (!token) return true;
    const decodedToken: any = jwtDecode(token);
    const user = {
      id: decodedToken.ID,
      logName: decodedToken.LogName,
      fullName: decodedToken.FullName,
      permissions: decodedToken.permissions,
    };
    return user;
  };
  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['./login']);
  };
  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }
  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';
}
