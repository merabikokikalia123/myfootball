import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthMe {
  name: string;
  email: string;
  role: string;
}

type JwtPayload = {
  exp?: number;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  private readonly meSubject = new BehaviorSubject<AuthMe | null>(null);
  readonly me$ = this.meSubject.asObservable();

  constructor(private http: HttpClient) {
    // Best-effort hydration from the existing token
    const token = this.getToken();
    if (token) {
      const role = this.getRoleFromToken(token);
      const email = this.getEmailFromToken(token);
      const name = this.getNameFromToken(token);
      if (role || email || name) {
        this.meSubject.next({ name, email, role });
      }

      // Server-validated user info (role cannot be faked without a valid JWT)
      this.refreshMe().subscribe();
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    // Never trust or persist role in localStorage.
    localStorage.removeItem('role');

    const role = this.getRoleFromToken(token);
    const email = this.getEmailFromToken(token);
    const name = this.getNameFromToken(token);
    this.meSubject.next({ name, email, role });
    this.refreshMe().subscribe();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('role');
    localStorage.removeItem('profile');
    this.meSubject.next(null);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;

    if (this.isTokenExpired(token)) {
      this.logout();
      return null;
    }

    return token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const role = (this.meSubject.value?.role ?? '').toLowerCase();
    return role === 'admin';
  }

  refreshMe(): Observable<AuthMe | null> {
    if (!this.getToken()) return of(null);

    return this.http.get<AuthMe>(`${this.baseUrl}/auth/me`).pipe(
      tap((me) => this.meSubject.next(me)),
      catchError((error: unknown) => {
        const status = (error as HttpErrorResponse)?.status;
        if (status === 401 || status === 403) {
          // Token invalid/expired or user no longer allowed
          this.logout();
          return of(null);
        }
        return of(this.meSubject.value);
      })
    );
  }

  private getRoleFromToken(token: string): string {
    const payload = this.decodeJwtPayload(token);
    if (!payload) return '';

    const roleClaim =
      payload['role'] ??
      payload['Role'] ??
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (typeof roleClaim === 'string') return roleClaim;
    if (Array.isArray(roleClaim) && typeof roleClaim[0] === 'string') {
      return roleClaim[0];
    }
    return '';
  }

  private getEmailFromToken(token: string): string {
    const payload = this.decodeJwtPayload(token);
    if (!payload) return '';

    const emailClaim =
      payload['email'] ??
      payload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];

    return typeof emailClaim === 'string' ? emailClaim : '';
  }

  private getNameFromToken(token: string): string {
    const payload = this.decodeJwtPayload(token);
    if (!payload) return '';

    const nameClaim =
      payload['name'] ??
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    return typeof nameClaim === 'string' ? nameClaim : '';
  }

  private decodeJwtPayload(token: string): Record<string, unknown> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payloadBase64Url = parts[1];
      const payloadBase64 = payloadBase64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(Math.ceil(payloadBase64Url.length / 4) * 4, '=');

      const json = atob(payloadBase64);
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    const payload = this.decodeJwtPayload(token) as JwtPayload | null;
    const exp = payload?.exp;
    if (typeof exp !== 'number') return false;
    return Date.now() >= exp * 1000;
  }
}
