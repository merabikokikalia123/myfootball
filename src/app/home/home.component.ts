import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:false,
})
export class HomeComponent implements OnInit {
  deluxeRooms: any[] = [];
checkIn: any;
checkOut: any;
minPrice: any;
maxPrice: any;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.loadDeluxeRooms();
  }

  loadDeluxeRooms() {
    this.httpService.getAllRooms().subscribe({
      next: (rooms) => {
        this.deluxeRooms = rooms.filter((room: any) =>
          room.name.toLowerCase().includes('deluxe')
        );
      },
      error: (err) => {
        console.error('ოთახების ჩატვირთვა ვერ მოხერხდა:', err);
      },
    });
  }

  bookNow(roomId: number) {
    // აქ საჭიროა რეალური მომხმარებლის მონაცემები
    const bookingData = {
      roomId: roomId,
      customerName: 'გიორგი ვაშაკიძე',   
      customerPhone: '599123456',         
      checkInDate: '2025-06-01',           
      checkOutDate: '2025-06-05',          
  totalPrice: 500              
    };

    this.httpService.createBooking(bookingData).subscribe({
      next: (response) => {
        alert('ჯავშნა წარმატებით შესრულდა!');
        console.log('Booking response:', response);
      },
      error: (error) => {
        alert('შეცდომა ჯავშნის დროს. სცადეთ ხელახლა.');
        console.error(error);
      },
    });
  }
}
