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
})
export class ItemsListComponent implements OnInit {
  items: Character[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('q') || '';
      this.loadData();
    });
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.itemsService.getItems(this.searchTerm).subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load characters.';
        this.items = [];
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchTerm || null },
      queryParamsHandling: 'merge',
    });
  }
}