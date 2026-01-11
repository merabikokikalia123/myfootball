import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill all fields';
      this.successMessage = '';
      return;
    }

    // აქ შემდეგში API შეაერთებ
    this.successMessage = 'Login successful!';
    this.errorMessage = '';
  }
}