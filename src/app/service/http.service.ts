import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
/////aq yvela api ertad rogorc vici :D 
  constructor(private http: HttpClient) {}


 
  getAllPlayers() {
  return this.http.get<any[]>('https://localhost:7071/api/players');
}
   getAllNews() {
  return this.http.get<any[]>('https://localhost:7071/api/news');
}
login(data: any) {
  return this.http.post<any>('https://localhost:7071/api/auth/login', data);
}


  handleError(handleError: any): import("rxjs").OperatorFunction<any, any> {
    throw new Error('Method not implemented.');
  }

 


}