import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { blogItems } from '../mocks/blog.mock';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-feed',
  styleUrl: './feed.scss',
  templateUrl: './feed.html',
})
export class Feed {
  private router = inject(Router);
  blogItems = blogItems;
  onVoltar(): void {
    this.router.navigate(['cadastro-receitas']); 
  }

  verDetalhe(codigo: number) : void {
    this.router.navigate(['/artigo', codigo]);
  }
}
