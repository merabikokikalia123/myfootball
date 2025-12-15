import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scouting-judo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scouting-judo.component.html',
  styleUrls: ['./scouting-judo.component.css']
})
export class ScoutingJudoComponent implements OnInit {

  isPremium = false; // 🔐 backend/auth-ით შეცვლი

  athletes: any[] = [];
  filteredAthletes: any[] = [];

  weightFilter: number | null = null;
  beltFilter: string = '';

  ngOnInit(): void {
    this.filteredAthletes = this.athletes;
  }

  filterAthletes(): void {
    let data = this.athletes;

    if (this.weightFilter !== null) {
      data = data.filter(a => a.weight === this.weightFilter);
    }

    if (this.beltFilter) {
      data = data.filter(a =>
        a.belt.toLowerCase().includes(this.beltFilter.toLowerCase())
      );
    }

    this.filteredAthletes = data;
  }

  addAthlete(): void {
    const athlete = {
      name: '',
      age: null,
      weight: null,
      belt: ''
    };

    this.athletes.push(athlete);
    this.filteredAthletes = this.athletes;
  }
}
