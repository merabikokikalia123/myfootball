import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 

  private hotelsUrl = 'https://hotelbooking.stepprojects.ge/api/Hotels/GetAll';
  private roomsUrl = 'https://hotelbooking.stepprojects.ge/api/Rooms/GetAll';
  private apiUrl = 'https://hotelbooking.stepprojects.ge/api/Booking';
  private filteredRoomsUrl = 'https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered';

  constructor(private http: HttpClient) {}


  getHotels(city?: string): Observable<any> {
    const url = city ? `https://hotelbooking.stepprojects.ge/api/Hotels/GetHotels?city=${city}` : this.hotelsUrl;
    return this.http.get<any>(url).pipe(
      
    );
  }

//  yvela otaxi 
  getAllRooms(): Observable<any> {
    return this.http.get<any>(this.roomsUrl).pipe(

    );
  }

  // otaxebis detalebi 
  getRoomById(roomId: number): Observable<any> {
    return this.http.get<any>(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${roomId}`).pipe(
      
    );
  }

// axali booking
 
    createBooking(bookingData: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, bookingData);
}

  

//  yvela booking
  getBookings(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
    
    );
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<any, any> {
    throw new Error('Method not implemented.');
  }

 
  // // deleteBooking(id: number): Observable<any> {
  // //   return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
    
  // //   );
  // }

  
  getFilteredRooms(filterData: any): Observable<any> {
    return this.http.post<any>(this.filteredRoomsUrl, filterData).pipe(
     
    );
  }
 


  getRoomTypes(): Observable<any> {
    const url = 'https://hotelbooking.stepprojects.ge/api/Rooms/GetRoomTypes';
    return this.http.get<any>(url).pipe(

    );
  }
deleteBooking(bookingId: number): Observable<any> {
  return this.http.delete(`https://hotelbooking.stepprojects.ge/api/Booking/${bookingId}`);
}
getAllBookings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
