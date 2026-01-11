import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  isSubmitted = false;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  private fb = inject(FormBuilder);

  form = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';

    if (!this.token) {
      this.messageType = 'error';
      this.message = 'Token ვერ მოიძებნა. გთხოვთ გადაამოწმოთ ლინკი.';
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.message = '';
    this.messageType = '';

    if (!this.token) {
      this.messageType = 'error';
      this.message = 'Token ვერ მოიძებნა.';
      return;
    }

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.httpService
      .resetPassword({
        token: this.token,
        newPassword: this.form.value.newPassword,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.messageType = 'success';
          this.message = 'პაროლი წარმატებით განახლდა. შეგიძლიათ შესვლა.';
          this.form.reset();
          this.isSubmitted = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.messageType = 'error';
          this.message =
            error?.error?.message ||
            'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.';
        },
      });
  }
}
