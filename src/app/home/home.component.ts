import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  footballNews: any[] = [];
  judoNews: any[] = [];
  basketballNews: any[] = [];
  mmaNews: any[] = [];

  defaultNewsImageUrl = 'https://via.placeholder.com/800x400?text=News';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.httpService.getAllNews().subscribe({
      next: (news) => {
        const normalize = (value: unknown) => String(value ?? '').toLowerCase();

        this.footballNews = news.filter(
          (n: any) => normalize(n.category) === 'football'
        );
        this.judoNews = news.filter(
          (n: any) => normalize(n.category) === 'judo'
        );
        this.basketballNews = news.filter(
          (n: any) => normalize(n.category) === 'basketball'
        );
        this.mmaNews = news.filter((n: any) => normalize(n.category) === 'mma');
      },
      error: (err) => {
        console.error('News ვერ ჩაიტვირთა:', err);
      },
    });
  }
}
