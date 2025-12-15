import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    // 🔐 აქ რეალურად backend API უნდა იყოს
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
    // 🔄 API call
    console.log('Updated profile:', this.user);
    alert('Profile updated successfully');
  }

  buyPremium(): void {
    // 💳 გადახდის გვერდზე გადამისამართება
    alert('Redirecting to Premium purchase...');
  }

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}
