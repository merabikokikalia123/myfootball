import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scouting-football',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scouting-football.component.html',
  styleUrls: ['./scouting-football.component.css']
})
export class ScoutingFootballComponent {

  isPremium = false; // ← აქ მერე backend/auth-ით შეცვლი

  players: any[] = [];
  filteredPlayers: any[] = [];

  ageFilter: number | null = null;
  positionFilter: string = '';

  ngOnInit() {
    this.filteredPlayers = this.players;
  }

  filterPlayers() {
    let data = this.players;

    if (this.ageFilter !== null) {
      data = data.filter(p => p.age === this.ageFilter);
    }

    if (this.positionFilter) {
      data = data.filter(p =>
        p.position.toLowerCase().includes(this.positionFilter.toLowerCase())
      );
    }

    this.filteredPlayers = data;
  }

  addPlayer() {
    const newPlayer = {
      name: '',
      age: null,
      position: ''
    };

    this.players.push(newPlayer);
    this.filteredPlayers = this.players;
  }
}