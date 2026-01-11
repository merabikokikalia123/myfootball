import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

type JwtPayload = {
  exp?: number;
  [key: string]: unknown;
};

type ProfileModel = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isPremium: boolean;
  photo: string;
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private readonly profileStorageKey = 'profile';

  user: ProfileModel = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isPremium: false,
    photo: 'https://via.placeholder.com/120',
  };

  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const payload = this.tryDecodeJwtPayload(token);
    if (payload?.exp && Date.now() >= payload.exp * 1000) {
      // token expired
      this.logout();
      return;
    }

    this.loadProfileFromStorageAndToken(payload);
  }

  private loadProfileFromStorageAndToken(payload: JwtPayload | null): void {
    const saved = this.tryReadSavedProfile();
    if (saved) {
      this.user = { ...this.user, ...saved };
    }

    // Prefer token claims for identity fields
    const emailClaim =
      payload?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    const nameClaim =
      payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const roleClaim =
      payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (typeof emailClaim === 'string') {
      this.user.email = emailClaim;
    }

    // If first/last aren't saved, derive from the token name
    if (
      (!this.user.firstName || !this.user.lastName) &&
      typeof nameClaim === 'string'
    ) {
      const parts = nameClaim.trim().split(/\s+/).filter(Boolean);
      if (parts.length > 0) {
        this.user.firstName = this.user.firstName || parts[0];
        this.user.lastName = this.user.lastName || parts.slice(1).join(' ');
      }
    }

    const tokenRole =
      typeof roleClaim === 'string' ? roleClaim.toLowerCase() : '';
    this.user.isPremium = tokenRole === 'premium' || tokenRole === 'admin';
  }

  private tryReadSavedProfile(): Partial<ProfileModel> | null {
    try {
      const raw = localStorage.getItem(this.profileStorageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<ProfileModel>;
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  private tryDecodeJwtPayload(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payloadB64Url = parts[1];
      const payloadJson = this.base64UrlDecode(payloadB64Url);
      return JSON.parse(payloadJson) as JwtPayload;
    } catch {
      return null;
    }
  }

  private base64UrlDecode(input: string): string {
    const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    return decodeURIComponent(
      Array.from(atob(padded))
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
  }

  updateProfile(): void {
    // No backend endpoint yet; persist locally so UI feels functional.
    localStorage.setItem(
      this.profileStorageKey,
      JSON.stringify({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
        photo: this.user.photo,
      })
    );

    alert('Profile saved locally');
  }

  buyPremium(): void {
    alert('Redirecting to Premium purchase...');
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem(this.profileStorageKey);
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`.trim();
  }
}
