import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-view',
  imports: [CommonModule, MatToolbarModule, MatIconModule, FormsModule],
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.scss',
})
export class SearchViewComponent {
  name: string = '';
  constructor(private router: Router) {}
  onClose(): void {
    this.router.navigate(['/']);
  }
}
