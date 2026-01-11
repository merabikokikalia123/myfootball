import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  private navSub?: Subscription;
  private authSub?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.refreshAuthState();

    // Update header immediately when auth state changes
    this.authSub = this.authService.me$.subscribe(() => {
      this.refreshAuthState();
    });

    // Update header state after login/logout navigations
    this.navSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshAuthState();
      }
    });
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
    this.authSub?.unsubscribe();
  }

  logout(event?: Event): void {
    event?.preventDefault();
    this.authService.logout();
    this.refreshAuthState();
    this.router.navigate(['/login']);
  }

  private refreshAuthState(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
