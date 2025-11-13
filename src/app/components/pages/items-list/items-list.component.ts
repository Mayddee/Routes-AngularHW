import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService, Character } from '../../../services/items.service';
import { ItemCardComponent } from '../../item-card/item-card.component';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ItemCardComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})export class ItemsListComponent implements OnInit {

  items: Character[] = [];
  searchTerm = '';
  loading = false;
  error: string | null = null;

  constructor(
    private service: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('q') || '';
      this.loadData();
    });
  }

  loadData() {
    this.loading = true;
    this.error = null;

    this.service.getItems(this.searchTerm).subscribe({
      next: res => {
        this.items = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load characters';
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }
}

