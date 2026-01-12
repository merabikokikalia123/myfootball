import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../all-players/safe-url.pipe';
import { PlayerService } from '../services/player.service';
import { Player } from '../all-players/all-players.component';
import { AuthService } from '../services/auth.service';
import { toYoutubeEmbedUrl } from '../shared/youtube';

@Component({
  selector: 'app-scouting-judo',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './scouting-judo.component.html',
  styleUrls: ['./scouting-judo.component.css'],
})
export class ScoutingJudoComponent implements OnInit {
  players: Player[] = [];
  filteredPlayers: Player[] = [];

  // form fields
  name = '';
  age: number | null = null;
  weight: number | null = null;
  belt = '';
  country = '';
  photoUrl = '';
  videoUrl = '';
  isAdmin = false;

  constructor(
    private playerService: PlayerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    // load all Judo athletes from PlayerService
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players.filter((p) => p.sport === 'Judo');
      this.filteredPlayers = this.players;
    });
  }

  // Add Judo athlete
  addAthlete() {
    if (!this.name || !this.age || !this.weight || !this.belt) {
      alert('ყველა ველი სავალდებულოა');
      return;
    }

    const newAthlete: Player = {
      name: this.name,
      age: this.age,
      sport: 'Judo',
      weightCategory: this.weight?.toString(),
      belt: this.belt,
      country: this.country || 'Unknown',
      photoUrl: this.photoUrl || 'https://via.placeholder.com/300',
      videoUrl: toYoutubeEmbedUrl(this.videoUrl) || undefined,
    };

    this.playerService.addPlayer(newAthlete).subscribe({
      next: () => {
        // reset form
        this.name = '';
        this.age = null;
        this.weight = null;
        this.belt = '';
        this.country = '';
        this.photoUrl = '';
        this.videoUrl = '';
      },
      error: (error) => {
        alert(
          error?.error?.message ||
            'მოთამაშის დამატება ვერ მოხერხდა (შესაძლოა Admin იყოს საჭირო)'
        );
      },
    });
  }

  // Delete Judo athlete
  deleteAthlete(player: Player) {
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

  // Filter (optional)
  filterAthletes(weightFilter?: number, beltFilter?: string) {
    let data = this.players;

    if (weightFilter !== undefined && weightFilter !== null) {
      data = data.filter((p) => p.weightCategory == weightFilter.toString());
    }

    if (beltFilter) {
      data = data.filter(
        (p) => p.belt?.toLowerCase().includes(beltFilter.toLowerCase()) ?? false
      );
    }

    this.filteredPlayers = data;
  }
}
