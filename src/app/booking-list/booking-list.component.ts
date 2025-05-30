import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.css'],
  standalone: false,
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];
booking: any;
hotel: any;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getAllBookings().subscribe({
      next: (data: any[]) => {
        this.bookings = data;
        console.log('Bookings:', data);
      },
      error: (err: any) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }

  deleteBooking(id: number): void {
    if (confirm('დარწმუნებული ხარ, რომ გსურს ჯავშნის წაშლა?')) {
      this.httpService.deleteBooking(id).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(b => b.id !== id);
        },
        error: err => {
          console.error('წაშლის შეცდომა:', err);
          alert('ვერ მოხერხდა ჯავშნის წაშლა.');
        }
      });
    }
  }
}
