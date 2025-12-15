import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scouting-mma',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scouting-mma.component.html',
  styleUrls: ['./scouting-mma.component.css']
})
export class ScoutingMmaComponent implements OnInit {

  isPremium = false; // 🔐 backend / auth-ით შეცვლი

  fighters: any[] = [];
  filteredFighters: any[] = [];

  weightClassFilter: string = '';
  recordFilter: string = '';

  ngOnInit(): void {
    this.filteredFighters = this.fighters;
  }

  filterFighters(): void {
    let data = this.fighters;

    if (this.weightClassFilter) {
      data = data.filter(f =>
        f.weightClass.toLowerCase().includes(this.weightClassFilter.toLowerCase())
      );
    }

    if (this.recordFilter) {
      data = data.filter(f =>
        f.record.toLowerCase().includes(this.recordFilter.toLowerCase())
      );
    }

    this.filteredFighters = data;
  }

  addFighter(): void {
    const fighter = {
      name: '',
      age: null,
      weightClass: '',
      record: ''
    };

    this.fighters.push(fighter);
    this.filteredFighters = this.fighters;
  }
}
