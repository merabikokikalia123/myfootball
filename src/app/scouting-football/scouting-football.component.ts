import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../all-players/safe-url.pipe';
import { PlayerService } from '../services/player.service';
import { Player } from '../all-players/all-players.component';

@Component({
  selector: 'app-scouting-football',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './scouting-football.component.html',
  styleUrls: ['./scouting-football.component.css'],
})
export class ScoutingFootballComponent implements OnInit {
  players: Player[] = [];
  filteredPlayers: Player[] = [];

  // form fields
  name = '';
  age: number | null = null;
  position = '';
  height: number | null = null;
  photoUrl = '';
  videoUrl = '';
  country = '';

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    // აბონენტი ფეხბურთელებზე
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players.filter((p) => p.sport === 'Football');
      this.filteredPlayers = this.players;
    });
  }

  buyPlayerSlot() {
    if (!this.name || !this.age || !this.position || !this.country) {
      alert('ყველა ველი სავალდებულოა');
      return;
    }

    const newPlayer: Player = {
      name: this.name,
      age: this.age,
      sport: 'Football',
      position: this.position,
      height: this.height ?? 180,
      country: this.country,
      photoUrl: this.photoUrl || 'https://via.placeholder.com/300',
      videoUrl: this.videoUrl || 'https://www.youtube.com/embed/',
    };

    this.playerService.addPlayer(newPlayer).subscribe({
      next: () => {
        // ფორმის reset
        this.name = '';
        this.age = null;
        this.position = '';
        this.height = null;
        this.photoUrl = '';
        this.videoUrl = '';
        this.country = '';
      },
      error: (error) => {
        alert(
          error?.error?.message ||
            'მოთამაშის დამატება ვერ მოხერხდა (შესაძლოა Admin იყოს საჭირო)'
        );
      },
    });
  }

  deletePlayer(player: Player) {
    if (confirm(`ნამდვილად გინდა ამ მოთამაშის "${player.name}" წაშლა?`)) {
      this.playerService.deletePlayer(player).subscribe({
        error: (error) => {
          alert(
            error?.error?.message ||
              'წაშლა ვერ მოხერხდა (შესაძლოა Admin იყოს საჭირო)'
          );
        },
      });
    }
  }
}
