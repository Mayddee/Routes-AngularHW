import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of } from 'rxjs';
export interface Character {
  index?: number;         
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  children: string[];
  image: string;
  birthdate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly baseUrl =
    'https://potterapi-fedeperin.vercel.app/en/characters';

  constructor(private http: HttpClient) {}

  getItems(query?: string): Observable<Character[]> {
    if (query && query.trim()) {
      const q = encodeURIComponent(query.trim());
      return this.http.get<Character[]>(`${this.baseUrl}?search=${q}`);
    }
    return this.http.get<Character[]>(this.baseUrl);
  }

  getItemById(id: string | number): Observable<Character | null> {
    const idx = Number(id);

    if (!isNaN(idx)) {
      return this.http
        .get<Character[]>(`${this.baseUrl}?index=${idx}`)
        .pipe(
          switchMap(arr => {
            const result = arr[0];

            if (result) return of(result);

            return this.fetchByListIndexAndThenSearch(idx);
          })
        );
    }

    return of(null);
  }

  private fetchByListIndexAndThenSearch(
    idx: number
  ): Observable<Character | null> {
    return this.http.get<Character[]>(this.baseUrl).pipe(
      map(list => list[idx] || null),
      switchMap(base => {
        if (!base) return of(null);

        const q = encodeURIComponent(base.fullName);

        return this.http
          .get<Character[]>(`${this.baseUrl}?search=${q}`)
          .pipe(map(arr => arr[0] || base));
      })
    );
  }

  searchItems(query: string): Observable<Character[]> {
    const q = encodeURIComponent(query.trim());
    return this.http.get<Character[]>(`${this.baseUrl}?search=${q}`);
  }
}