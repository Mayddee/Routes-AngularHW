import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemsService, Character } from '../../../services/items.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item: Character | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: ItemsService
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('index');

  if (id === null) {
    this.error = 'Missing character ID';
    return;
  }

  this.loading = true;

  this.service.getItemById(id).subscribe({
    next: data => {
      this.item = data;
      this.loading = false;
    },
    error: () => {
      this.error = 'Failed to load character details';
      this.loading = false;
    }
  });
}

}
