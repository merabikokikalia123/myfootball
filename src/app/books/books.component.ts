// books.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../service/http.service';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
    standalone: false,
})
export class BooksComponent implements OnInit {
  roomID!: string;
  checkInDate!: string;
  checkOutDate!: string;
  price: any;
  isConfirmed!: boolean;
  customerName!: string;
  customerId!: string;
  customerPhone!: string;
  minPrice: any;
  maxPrice: any;
  guests: any;

  successMessage: string = '';
  errorMessage: string = '';
checkInDateString: any;
  roomImages: any;
  totalPrice: any;
  rooms: any;
booking: any;
  http: any;
  apiUrl: any;



  constructor(private route: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.roomID = params.roomID;
     this.checkInDate = params.checkInDate ? new Date(params.checkInDate).toISOString() : '';
    this.checkOutDate = params.checkOutDate ? new Date(params.checkOutDate).toISOString() : '';
      this.minPrice = params.minPrice;
      this.maxPrice = params.maxPrice;
      this.guests = params.guests;
      this.price = params.price;
      

      this.isConfirmed = params.isConfirmed === 'true' || params.isConfirmed === true;
     

        this.totalPrice = this.calculateTotalPrice(this.price)

     
    });
  }


    calculateTotalPrice(pricePerNight: number): number {
    const checkInDate = new Date(this.checkInDate!);
    const checkOutDate = new Date(this.checkOutDate!);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return pricePerNight * nights;
  }



  confirmBooking() {
     const booking = {
    id: 0, 
    roomID: Number(this.roomID), 
    checkInDate: this.checkInDate,
    checkOutDate: this.checkOutDate,
    totalPrice: this.totalPrice || 0, 
    isConfirmed: this.isConfirmed,
    customerName: this.customerName || 'unknown',
    customerId: this.customerId || 'unknown',
    customerPhone: this.customerPhone || 'unknown',
 
  };

    console.log(booking);
    

    this.httpService.createBooking(booking).subscribe({
      next: () => this.successMessage = 'დაჯავშნა წარმატებით გაიგზავნა!',
      error: () => this.errorMessage = 'დაჯავშნის გაგზავნის შეცდომა!'
    });
  }
    deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


