import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Character {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  children: string[];
  image: string;
  birthdate: string;
  // index тоже есть в некоторых ответах, но для логики нам он не нужен
  index?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly baseUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';

  constructor(private http: HttpClient) {}



  searchItems(query: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}?search=${query}`);
  }
// Получить список персонажей (если есть query — серверный поиск)
  getItems(query?: string): Observable<Character[]> {
    if (query && query.trim()) {
      const q = encodeURIComponent(query.trim());
      return this.http.get<Character[]>(`${this.baseUrl}?search=${q}`);
    }
    return this.http.get<Character[]>(this.baseUrl);
  }

  // Получить ОДНОГО персонажа по имени (используем search и берём первый матч)
  getItemByName(name: string): Observable<Character | null> {
    const q = encodeURIComponent(name.trim());
    return this.http
      .get<Character[]>(`${this.baseUrl}?search=${q}`)
      .pipe(map((items) => (items.length > 0 ? items[0] : null)));
  }
}