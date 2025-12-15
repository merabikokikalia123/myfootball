import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scouting-basketball',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scouting-basketball.component.html',
  styleUrls: ['./scouting-basketball.component.css']
})
export class ScoutingBasketballComponent {

  // 🔐 Premium state (შემდეგ backend-იდან მოვა)
  isPremium = false;

  // FILTERS
  ageFilter: number | null = null;
  positionFilter = '';
  heightFilter: number | null = null;

  // ADD PLAYER
  name = '';
  age: number | null = null;
  position = '';
  height: number | null = null;

  players: any[] = [];

  filterPlayers() {
    console.log({
      age: this.ageFilter,
      position: this.positionFilter,
      height: this.heightFilter
    });
  }

  addPlayer() {
    if (!this.name || !this.age || !this.position || !this.height) {
      alert('ყველა ველი სავალდებულოა');
      return;
    }

    this.players.push({
      name: this.name,
      age: this.age,
      position: this.position,
      height: this.height
    });

    // reset
    this.name = '';
    this.age = null;
    this.position = '';
    this.height = null;
  }
}