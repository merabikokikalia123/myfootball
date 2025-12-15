import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-all-players',
  standalone: true,   // 🔴 ძალიან მნიშვნელოვანია
  imports: [CommonModule, FormsModule], // 🔴 ngModel აქედან მუშაობს
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css']
})
export class AllPlayersComponent implements OnInit {

  players: any[] = [];

  footballPlayers: any[] = [];
  judoPlayers: any[] = [];
  basketballPlayers: any[] = [];
  mmaPlayers: any[] = [];

  sportFilter: string = '';
  ageFilter: number | null = null;
  positionFilter: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.httpService.getAllPlayers().subscribe({
      next: (data) => {
        this.players = data;
        this.splitBySport(this.players);
      },
      error: (err) => console.error(err)
    });
  }

  applyFilter(): void {
    let filtered = this.players;

    if (this.sportFilter) {
      filtered = filtered.filter(p => p.sport === this.sportFilter);
    }

    if (this.ageFilter !== null) {
      filtered = filtered.filter(p => p.age === this.ageFilter);
    }

    if (this.positionFilter) {
      filtered = filtered.filter(p =>
        p.position.toLowerCase().includes(this.positionFilter.toLowerCase())
      );
    }

    this.splitBySport(filtered);
  }

  splitBySport(players: any[]): void {
    this.footballPlayers   = players.filter(p => p.sport === 'Football');
    this.judoPlayers       = players.filter(p => p.sport === 'Judo');
    this.basketballPlayers = players.filter(p => p.sport === 'Basketball');
    this.mmaPlayers        = players.filter(p => p.sport === 'MMA');
  }
}
