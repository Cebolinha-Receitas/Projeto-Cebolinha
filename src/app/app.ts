import { Component, signal, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LucideCaseSensitive, LucideHeart, LucideSearch, LucideUser } from '@lucide/angular';

@Component({
  imports: [RouterOutlet, LucideHeart, LucideSearch, LucideUser, LucideCaseSensitive, RouterLink],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('projetocebolinha');
  protected menuFonteAberto = signal(false);

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private router = inject(Router);

  toggleMenuFonte() {
    this.menuFonteAberto.update(estado => !estado);
  }

  alterarFonte(tamanho: 'normal' | 'media' | 'gigante') {
    let tamanhoPx = 16;
    if (tamanho === 'media') {
      tamanhoPx = 20; 
    } else if (tamanho === 'gigante') {
      tamanhoPx = 24; 
    }
    this.renderer.setStyle(this.document.documentElement, 'font-size', `${tamanhoPx}px`);
    this.menuFonteAberto.set(false);
  }

  pesquisar(termo: string) {
    if (termo.trim()) {
      this.router.navigate(['/pesquisa'], { queryParams: { q: termo } });
    }
  }
}