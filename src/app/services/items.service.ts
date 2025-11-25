import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of, throwError } from 'rxjs';

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

  // list
  getItems(query?: string): Observable<Character[]> {
    if (query && query.trim()) {
      const q = encodeURIComponent(query.trim());
      return this.http.get<Character[]>(`${this.baseUrl}?search=${q}`);
    }
    return this.http.get<Character[]>(this.baseUrl);
  }

  // details
  getItemById(id: string | number): Observable<Character> {
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

    return throwError(() => new Error('Invalid character id'));
  }

  private fetchByListIndexAndThenSearch(
    idx: number
  ): Observable<Character> {
    return this.http.get<Character[]>(this.baseUrl).pipe(
      map(list => list[idx] || null),
      switchMap(base => {
        if (!base) {
          return throwError(() => new Error('Character not found'));
        }

        const q = encodeURIComponent(base.fullName);

        return this.http
          .get<Character[]>(`${this.baseUrl}?search=${q}`)
          .pipe(
            map(arr => arr[0] || base)
          );
      })
    );
  }

  searchItems(query: string): Observable<Character[]> {
    const q = encodeURIComponent(query.trim());
    return this.http.get<Character[]>(`${this.baseUrl}?search=${q}`);
  }
}
