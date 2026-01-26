import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router';

export interface Player {
  id?: number;
  name: string;
  age: number;
  sport: string;
  position?: string;
  height?: number;
  country?: string;
  photoUrl?: string;
  videoUrl?: string;
  weightCategory?: string;
  belt?: string;
  weightClass?: string;
  record?: string;
}

@Component({
  selector: 'app-all-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css'],
})
export class AllPlayersComponent implements OnInit {
  players: Player[] = [];
  filteredPlayers: Player[] = [];

  sportFilter = '';
  ageFilter: number | null = null;
  extraFilter = '';

  constructor(
    private sanitizer: DomSanitizer,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;
      this.filteredPlayers = players;
    });
  }

  applyFilter(): void {
    this.filteredPlayers = this.players.filter((player) => {
      const sportMatch = this.sportFilter
        ? player.sport === this.sportFilter
        : true;

      const ageMatch = this.ageFilter ? player.age === this.ageFilter : true;
      const search = this.extraFilter.toLowerCase();

      const extraMatch = search
        ? player.name.toLowerCase().includes(search) ||
          (player.country?.toLowerCase().includes(search) ?? false) ||
          (player.position?.toLowerCase().includes(search) ?? false)
        : true;

      return sportMatch && ageMatch && extraMatch;
    });
  }

  getSportBadge(sport: string): string {
    switch (sport) {
      case 'Football':
        return 'bg-success';
      case 'Basketball':
        return 'bg-primary';
      case 'Judo':
        return 'bg-warning text-dark';
      case 'MMA':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // ✏️ EDIT
  editPlayer(player: Player): void {
    if (!player.id) return;
    this.router.navigate(['/edit-player', player.id]);
  }

  // 🗑 DELETE
  deletePlayer(id?: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this player?')) {
      this.playerService.deletePlayer(id).subscribe(() => {
        this.players = this.players.filter((p) => p.id !== id);
        this.applyFilter();
      });
    }
  }
}
