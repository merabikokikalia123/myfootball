import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';

  message = '';

  isLoading = false;

  constructor(private httpService: HttpService, private router: Router) {}

  register() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.phone ||
      !this.password
    ) {
      this.message = '❌ ყველა ველი სავალდებულოა';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.httpService
      .register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.message = '✅ რეგისტრაცია წარმატებით დასრულდა';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.message = error?.error?.message || '❌ რეგისტრაცია ვერ შესრულდა';
        },
      });
  }
}
