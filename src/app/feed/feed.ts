import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-feed',
  styleUrl: './feed.scss',
  templateUrl: './feed.html',
})
export class Feed {
  private router = inject(Router); 
  onVoltar(): void {
    this.router.navigate(['cadastro-receitas']); 
  }
}
