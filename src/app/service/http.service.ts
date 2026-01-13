import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NewsItem } from '../home/home.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  constructor(private http: HttpClient) {}

  /** Players */
  getAllPlayers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/players`)
      .pipe(catchError(this.handleError));
  }

  /** News */
  getAllNews(): Observable<NewsItem[]> {
    return this.http
      .get<NewsItem[]>(`${this.baseUrl}/news`)
      .pipe(catchError(this.handleError));
  }

  addNews(newsItem: NewsItem): Observable<NewsItem> {
    return this.http
      .post<NewsItem>(`${this.baseUrl}/news`, newsItem)
      .pipe(catchError(this.handleError));
  }

  updateNews(newsItem: NewsItem): Observable<NewsItem> {
    if (!newsItem.id) throw new Error('News id is required for update');
    return this.http
      .put<NewsItem>(`${this.baseUrl}/news/${newsItem.id}`, newsItem)
      .pipe(catchError(this.handleError));
  }

  deleteNews(newsId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/news/${newsId}`)
      .pipe(catchError(this.handleError));
  }

  /** Auth */
  login(data: { email: string; password: string }): Observable<{ token: string; role: string }> {
    return this.http
      .post<{ token: string; role: string }>(`${this.baseUrl}/auth/login`, data)
      .pipe(catchError(this.handleError));
  }

  register(data: { firstName: string; lastName: string; email: string; phone: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/register`, data)
      .pipe(catchError(this.handleError));
  }

  forgotPassword(email: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  resetPassword(data: { token: string; newPassword: string | null | undefined }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/reset-password`, data)
      .pipe(catchError(this.handleError));
  }

  /** Error handler */
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
