import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../services/player.service'; // იგივე სერვისი Football-ისგან
import { Player } from '../all-players/all-players.component';
import { SafeUrlPipe } from "../all-players/safe-url.pipe";

@Component({
  selector: 'app-scouting-mma',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './scouting-mma.component.html',
  styleUrls: ['./scouting-mma.component.css']
})
export class ScoutingMmaComponent implements OnInit {

  fighters: Player[] = [];
  filteredFighters: Player[] = [];

  name = '';
  age: number | null = null;
  weightClass = '';
  record = '';
  country = '';
  isAdmin = false;

  // ფილტრები
  weightClassFilter = '';
  recordFilter = '';
  photoUrl: string | undefined;
  videoUrl: string | undefined;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    // აქ შეიძლება მომხმარებლის როლი admin-ისთვის
    this.isAdmin = localStorage.getItem('role') === 'admin';

    // load fighters from service
    this.playerService.getPlayers().subscribe(players => {
      this.fighters = players.filter(p => p.sport === 'MMA');
      this.filteredFighters = this.fighters;
    });
  }

  // დამატება
  addFighter() {
    if (!this.name || !this.age || !this.weightClass || !this.record) {
      alert('ყველა ველი სავალდებულოა');
      return;
    }

    const newFighter: Player = {
      name: this.name,
      age: this.age,
      sport: 'MMA',
      weightClass: this.weightClass,
      record: this.record,
  
       country: this.country,
      photoUrl: this.photoUrl || 'https://via.placeholder.com/300',
      videoUrl: this.videoUrl || 'https://www.youtube.com/embed/'
    };

    this.playerService.addPlayer(newFighter);

    // reset ფორმი
    this.name = '';
    this.age = null;
    this.weightClass = '';
    this.record = '';
    this.country = '';
  }

  // წაშლა
  deleteFighter(fighter: Player) {
  

    if (confirm(`ნამდვილად გინდა ამ მებრძოლის "${fighter.name}" წაშლა?`)) {
      this.playerService.deletePlayer(fighter);
    }
  }

  // ფილტრები
  filterFighters() {
    let data = this.fighters;

    if (this.weightClassFilter) {
      data = data.filter(f =>
        f.weightClass?.toLowerCase().includes(this.weightClassFilter.toLowerCase()) ?? false
      );
    }

    if (this.recordFilter) {
      data = data.filter(f =>
        f.record?.toLowerCase().includes(this.recordFilter.toLowerCase()) ?? false
      );
    }

    this.filteredFighters = data;
  }
}
