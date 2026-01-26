import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Player } from '../all-players/all-players.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private storageKey = 'players';
  private players: Player[] = [];
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.storageKey);
    this.players = saved ? JSON.parse(saved) : [];
    this.playersSubject.next(this.players);

    // Best effort sync from backend
    this.refresh().subscribe();
  }

  getPlayers() {
    return this.players$;
  }

  refresh(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/players`).pipe(
      tap((players) => {
        this.players = players;
        this.save();
      }),
      catchError(() => of(this.players))
    );
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}/players`, player).pipe(
      tap((created) => {
        this.players = [...this.players, created];
        this.save();
      })
    );
  }

  deletePlayer(player: Player): Observable<void> {
    // If we don't have an id, fallback to local delete
    if (!player.id) {
      this.players = this.players.filter((p) => p !== player);
      this.save();
      return of(void 0);
    }

    return this.http.delete<void>(`${this.baseUrl}/players/${player.id}`).pipe(
      tap(() => {
        this.players = this.players.filter((p) => p.id !== player.id);
        this.save();
      })
    );
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.players));
    this.playersSubject.next(this.players);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Player } from '../all-players/all-players.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private storageKey = 'players';
  private players: Player[] = [];
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.storageKey);
    this.players = saved ? JSON.parse(saved) : [];
    this.playersSubject.next(this.players);

    // Sync from backend
    this.refresh().subscribe();
  }

  /** Get all players (BehaviorSubject) */
  getPlayers(): Observable<Player[]> {
    return this.players$;
  }

  /** Refresh from backend */
  refresh(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/players`).pipe(
      tap((players) => {
        this.players = players;
        this.save();
      }),
      catchError(() => of(this.players))
    );
  }

  /** Add new player */
  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}/players`, player).pipe(
      tap((created) => {
        this.players = [...this.players, created];
        this.save();
      }),
      catchError(() => {
        // fallback to localStorage if backend fails
        player.id = Date.now();
        this.players.push(player);
        this.save();
        return of(player);
      })
    );
  }

  /** Update / Edit player */
  updatePlayer(player: Player): Observable<Player> {
    if (!player.id) {
      // localStorage only
      const index = this.players.findIndex((p) => p.name === player.name);
      if (index !== -1) {
        this.players[index] = player;
        this.save();
      }
      return of(player);
    }

    return this.http.put<Player>(`${this.baseUrl}/players/${player.id}`, player).pipe(
      tap((updated) => {
        const index = this.players.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          this.players[index] = updated;
          this.save();
        }
      }),
      catchError(() => {
        // fallback to localStorage
        const index = this.players.findIndex((p) => p.id === player.id);
        if (index !== -1) {
          this.players[index] = player;
          this.save();
        }
        return of(player);
      })
    );
  }

  /** Delete player */
  deletePlayer(player: Player): Observable<void> {
    if (!player.id) {
      // local delete only
      this.players = this.players.filter((p) => p !== player);
      this.save();
      return of(void 0);
    }

    return this.http.delete<void>(`${this.baseUrl}/players/${player.id}`).pipe(
      tap(() => {
        this.players = this.players.filter((p) => p.id !== player.id);
        this.save();
      }),
      catchError(() => {
        // fallback to localStorage
        this.players = this.players.filter((p) => p.id !== player.id);
        this.save();
        return of(void 0);
      })
    );
  }

  /** Save to localStorage + BehaviorSubject */
  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.players));
    this.playersSubject.next(this.players);
  }
}

