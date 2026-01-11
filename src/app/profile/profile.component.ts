import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isPremium: false,
    photo: 'https://via.placeholder.com/120'
  };

  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');

    if (!this.isLoggedIn) {
      // მომხმარებელი არ არის შემოსული
      alert('You are not logged in!');
      this.router.navigate(['/login']); // გადამისამართება login გვერდზე
      return;
    }

    this.loadProfile();
  }

  loadProfile(): void {
    this.user = {
      firstName: 'Giorgi',
      lastName: 'Kikalia',
      email: 'giorgi@gmail.com',
      phone: '599123456',
      isPremium: false,
      photo: 'https://via.placeholder.com/120'
    };
  }

  updateProfile(): void {
    console.log('Updated profile:', this.user);
    alert('Profile updated successfully');
  }

  buyPremium(): void {
    alert('Redirecting to Premium purchase...');
  }

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}
