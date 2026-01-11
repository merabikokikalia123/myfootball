import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../all-players/all-players.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private storageKey = 'players';
  private players: Player[] = [];

  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    this.players = saved ? JSON.parse(saved) : [];
    this.playersSubject.next(this.players);
  }

  getPlayers() {
    return this.players$;
  }

  addPlayer(player: Player) {
    this.players.push(player);
    this.save();
  }

  deletePlayer(player: Player) {
    this.players = this.players.filter(p => p !== player);
    this.save();
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.players));
    this.playersSubject.next(this.players);
  }
}
