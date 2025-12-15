import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {

  footballNews: any[] = [];
  judoNews: any[] = [];
  basketballNews: any[] = [];
  mmaNews: any[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.httpService.getAllNews().subscribe({
      next: (news) => {
        this.footballNews   = news.filter((n: any) => n.category === 'football');
        this.judoNews       = news.filter((n: any) => n.category === 'judo');
        this.basketballNews = news.filter((n: any) => n.category === 'basketball');
        this.mmaNews        = news.filter((n: any) => n.category === 'mma');
      },
      error: (err) => {
        console.error('News ვერ ჩაიტვირთა:', err);
      }
    });
  }
}
