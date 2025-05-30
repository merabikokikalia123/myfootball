import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
  standalone: false,
})
export class HotelsComponent implements OnInit {
  hotels: any;

  constructor(private service: HttpService) {}

  ngOnInit(): void {
    this.service.getHotels().subscribe((data: any) => {
      this.hotels = data;
    });
  }
}
