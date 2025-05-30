import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  standalone: false
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  roomTypes: any[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;

  minPrice!: number ;
  maxPrice!: number ;
 
  checkIn: string | null = null;
  checkOut: string | null = null;
  maximumGuests: number | null = null;
  selectedTypeId: number | null = 0;

  checkInDate: any;
  checkOutDate: any;
  totalPrice: any;
  customerName: any;
  getTotalPrice: any;
  customerPhone: any;

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    console.log(this.rooms);
    
  }

  ngOnInit(): void {
    this.getRooms();
    this.getRoomTypes();

   
    this.route.queryParams.subscribe(params => {

      
    });
  }

  getRooms(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.httpService.getAllRooms().subscribe(
      (response) => {
        this.rooms = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching rooms:', error);
        this.isLoading = false;
        this.errorMessage = 'Error fetching rooms. Please try again later.';
      }
    );
  }

  getRoomTypes(): void {
    this.httpService.getRoomTypes().subscribe({
      next: (data) => this.roomTypes = data,
      error: (err) => {
        console.error('Error fetching room types:', err);
      }
    });
  }

  applyFilters(): void {
    const filterData = {
      roomTypeId: this.selectedTypeId,
      priceFrom: this.minPrice,
      priceTo: this.maxPrice,
       maximumGuests: this.maximumGuests,
      checkInDate: this.checkIn,
      checkOutDate: this.checkOut,
     
    };

    console.log(filterData);
    

    this.isLoading = true;
    this.errorMessage = null;

    this.httpService.getFilteredRooms(filterData).subscribe(
      (response) => {
        this.rooms = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('ფილტრაციის შეცდომა:', error);
        this.errorMessage = 'ვერ მოხერხდა ოთახების ფილტრაცია. სცადეთ ხელახლა.';
        this.isLoading = false;
      }
    );
  }

  onRoomTypeChange($event: Event): void {
    const target = $event.target as HTMLSelectElement;
    this.selectedTypeId = +target.value;
  }

  bookNow(room: any): void {
  
    console.log('დაჯავშნა:', room);
  }




}
