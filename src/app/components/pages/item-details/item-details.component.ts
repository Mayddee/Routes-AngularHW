import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';
import {
  selectSelectedItem,
  selectItemDetailsLoading,
  selectItemDetailsError
} from '../../../items/state/items.selectors';
import { loadItem } from '../../../items/state/items.actions';
import { Observable } from 'rxjs';
import { Character } from '../../../services/items.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item$: Observable<Character | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.item$ = this.store.select(selectSelectedItem);
    this.loading$ = this.store.select(selectItemDetailsLoading);
    this.error$ = this.store.select(selectItemDetailsError);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('index');

    if (id === null) {
      // dispatch failure directly or just set error via store
      this.store.dispatch(
        loadItem({
          id: 'invalid-id' // or you could create a separate action if needed
        })
      );
      return;
    }

    this.store.dispatch(loadItem({ id }));
  }
}
