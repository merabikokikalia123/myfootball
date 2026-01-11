import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /////aq yvela api ertad rogorc vici :D
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/players`)
      .pipe(catchError(this.handleError));
  }

  getAllNews(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/news`)
      .pipe(catchError(this.handleError));
  }

  login(data: {
    email: string;
    password: string;
  }): Observable<{ token: string; role: string }> {
    return this.http
      .post<{ token: string; role: string }>(`${this.baseUrl}/auth/login`, data)
      .pipe(catchError(this.handleError));
  }

  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/register`, data)
      .pipe(catchError(this.handleError));
  }

  forgotPassword(email: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  resetPassword(data: {
    token: string;
    newPassword: string | null | undefined;
  }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/reset-password`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Let callers decide how to display errors
    return throwError(() => error);
  }
}
