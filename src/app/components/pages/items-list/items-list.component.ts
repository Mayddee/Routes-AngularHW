import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { ItemCardComponent } from '../../item-card/item-card.component';
import { Store } from '@ngrx/store';

import {
  selectItemsList,
  selectItemsListLoading,
  selectItemsListError
} from '../../../items/state/items.selectors';
import { loadItems } from '../../../items/state/items.actions';
import { Character } from '../../../services/items.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ItemCardComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  searchTerm = '';

  // store-based observables
  items$ = this.store.select(selectItemsList);
  loading$ = this.store.select(selectItemsListLoading);
  error$ = this.store.select(selectItemsListError);

  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    // react to query params and dispatch load
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('q') || '';
      this.store.dispatch(loadItems({ query: this.searchTerm || undefined }));
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  onSearch(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }
}
