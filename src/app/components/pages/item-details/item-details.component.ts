import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ItemsService, Character } from '../../../services/items.service';


@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  item: Character | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');

    if (!name) {
      this.error = 'No character name provided.';
      return;
    }

    this.loading = true;
    this.itemsService.getItemByName(name).subscribe({
      next: (item) => {
        this.item = item;
        if (!item) {
          this.error = 'Character not found.';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load character details.';
        this.loading = false;
      },
    });
  }
}