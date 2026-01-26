import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../all-players/safe-url.pipe';
import { PlayerService } from '../services/player.service';
import { Player } from '../all-players/all-players.component';
import { toYoutubeEmbedUrl } from '../shared/youtube';

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

  // ✏️ EDIT state
  editMode = false;
  editingPlayerId: number | undefined;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players.filter((p) => p.sport === 'Football');
      this.filteredPlayers = this.players;
    });
  }

  // ➕ ADD
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
      videoUrl: toYoutubeEmbedUrl(this.videoUrl) || undefined,
    };

    this.playerService.addPlayer(newPlayer).subscribe({
      next: () => this.resetForm(),
      error: (error) => {
        alert(
          error?.error?.message ||
            'მოთამაშის დამატება ვერ მოხერხდა (შესაძლოა Admin იყოს საჭირო)'
        );
      },
    });
  }

  // ✏️ START EDIT
  editPlayer(player: Player) {
    this.editMode = true;
    this.editingPlayerId = player.id;

    this.name = player.name;
    this.age = player.age;
    this.position = player.position ?? '';
    this.height = player.height ?? null;
    this.photoUrl = player.photoUrl ?? '';
    this.videoUrl = player.videoUrl ?? '';
    this.country = player.country ?? '';
  }

  // 💾 UPDATE
  updatePlayer() {
    if (!this.editingPlayerId) return;

    const updatedPlayer: Player = {
      id: this.editingPlayerId,
      name: this.name,
      age: this.age!,
      sport: 'Football',
      position: this.position,
      height: this.height ?? 180,
      country: this.country,
      photoUrl: this.photoUrl,
      videoUrl: toYoutubeEmbedUrl(this.videoUrl) || undefined,
    };

    this.playerService.updatePlayer(updatedPlayer).subscribe({
      next: () => this.resetForm(),
      error: (error) => {
        alert(
          error?.error?.message ||
            'განახლება ვერ მოხერხდა (შესაძლოა Admin იყოს საჭირო)'
        );
      },
    });
  }

  // 🗑 DELETE (უცვლელი)
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

  resetForm() {
    this.editMode = false;
    this.editingPlayerId = undefined;

    this.name = '';
    this.age = null;
    this.position = '';
    this.height = null;
    this.photoUrl = '';
    this.videoUrl = '';
    this.country = '';
  }
}

