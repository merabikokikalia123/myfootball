import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { Player } from '../all-players/all-players.component';
import { SafeUrlPipe } from '../all-players/safe-url.pipe';

@Component({
  selector: 'app-scouting-basketball',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './scouting-basketball.component.html',
  styleUrls: ['./scouting-basketball.component.css']
})
export class ScoutingBasketballComponent implements OnInit {

  players: Player[] = [];
  filteredPlayers: Player[] = [];

  // ADD PLAYER
  name = '';
  age: number | null = null;
  position = '';
  height: number | null = null;
  country = '';
  photoUrl = '';
  videoUrl = '';

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe(players => {
      // ვაჩვენებთ მხოლოდ Basketball-ს
      this.players = players.filter(p => p.sport === 'Basketball');
      this.filteredPlayers = this.players;
    });
  }

  addPlayer() {
    if (!this.name || !this.age || !this.position || !this.height || !this.country) {
      alert('ყველა ველი სავალდებულოა');
      return;
    }

    const player: Player = {
      name: this.name,
      age: this.age,
      sport: 'Basketball',
      position: this.position,
      height: this.height,
      country: this.country,
      photoUrl: this.photoUrl || 'https://via.placeholder.com/300',
      videoUrl: this.formatYoutubeUrl(this.videoUrl)
    };

    this.playerService.addPlayer(player);

    // reset
    this.name = '';
    this.age = null;
    this.position = '';
    this.height = null;
    this.country = '';
    this.photoUrl = '';
    this.videoUrl = '';
  }

  deletePlayer(player: Player) {
    if (confirm(`წავშალოთ ${player.name}?`)) {
      this.playerService.deletePlayer(player);
    }
  }

  private formatYoutubeUrl(url: string): string {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? 'https://www.youtube.com/embed/' + match[1] : '';
  }
}
