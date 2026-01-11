import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.message = '';
    this.messageType = '';

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.httpService.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.messageType = 'success';
        this.message = `პაროლის აღდგენის ინსტრუქცია გამოგზავნილია ${email}-ზე. გთხოვთ შეამოწმოთ თქვენი ელ. ფოსტა.`;
        this.forgotPasswordForm.reset();
        this.isSubmitted = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.messageType = 'error';
        this.message =
          error?.error?.message || 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.';
      },
    });
  }
}
