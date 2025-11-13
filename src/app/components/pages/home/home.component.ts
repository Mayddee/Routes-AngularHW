import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemsService, Character } from '../../../services/items.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featured: Character[] = [];
  loading = false;
  error: string | null = null;

  constructor(private service: ItemsService) {}

  ngOnInit(): void {
    this.loading = true;

    this.service.getItems().subscribe({
      next: (list) => {
        this.featured = list.slice(0, 3);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load characters';
        this.loading = false;
      }
    });
  }
}
