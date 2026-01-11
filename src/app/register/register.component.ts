import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';

  message = '';

  register() {
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.password) {
      this.message = '❌ ყველა ველი სავალდებულოა';
      return;
    }

    // აქ შემდეგ API-ს მიაბამ
    this.message = '✅ რეგისტრაცია წარმატებით დასრულდა';

    console.log({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password
    });
  }
}
