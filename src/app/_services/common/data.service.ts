import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASE_URI } from '../uri';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = BASE_URI;
  constructor(private http: HttpClient) {}
  // Tạo header mặc định
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('tokenTienTho')}`,
    });
  }
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
  // GET tất cả items
  getAll<T>(endpoint: string, params?: any): Observable<T[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http
      .get<T[]>(`${this.baseUrl}/${endpoint}`, {
        headers: this.getHeaders(),
        params: httpParams,
      })
      .pipe(catchError(this.handleError));
  }
  post(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${endpoint}`, JSON.stringify(data), {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }
  // POST: Thêm mới item
  create(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${endpoint}`, JSON.stringify(data), {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // PUT: Cập nhật item
  update(endpoint: string, id: string | number, data: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${endpoint}/${id}`, JSON.stringify(data), {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // DELETE: Xóa item
  delete(endpoint: string, id: string | number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${endpoint}/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }
}
