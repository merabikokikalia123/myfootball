import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
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

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.messageType = 'success';
      this.message = `პაროლის აღდგენის ინსტრუქცია გამოგზავნილია ${email}-ზე. გთხოვთ შეამოწმოთ თქვენი ელ. ფოსტა.`;
      this.forgotPasswordForm.reset();
      this.isSubmitted = false;
    }, 1500);

    // Real API call example (uncomment when ready):
    /*
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.messageType = 'success';
        this.message = 'პაროლის აღდგენის ინსტრუქცია გამოგზავნილია თქვენს ელ. ფოსტაზე';
        this.forgotPasswordForm.reset();
        this.isSubmitted = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.messageType = 'error';
        this.message = error.error?.message || 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.';
      }
    });
    */
  }
}


