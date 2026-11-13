import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritoService } from '../services/favorito'; 
import { Receita } from '../models/receita'; 
import { CardReceita } from '../card-receita/card-receita'; 

@Component({
  selector: 'app-favoritos',
  imports: [CardReceita],
  templateUrl: './favoritos.html',
})
export class FavoritosComponent implements OnInit {
  private favoritoService = inject(FavoritoService);
  private router = inject(Router);

  receitas = signal<Receita[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  carregarFavoritos(): void {
    this.carregando.set(true);
    this.favoritoService.listarFavoritos().subscribe({
      next: (dados) => {
        this.receitas.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar seus favoritos.');
        this.carregando.set(false);
      },
    });
  }

  verDetalheReceita(id?: string): void {
    if (id) {
      this.router.navigate(['/detalhe-receita', id]);
    }
  }

  // Remove o favorito e já atualiza a tela instantaneamente
  removerDosFavoritos(id?: string): void {
    if (!id) return;

    this.favoritoService.removerFavorito(id).subscribe({
      next: () => {
        // Filtra a lista atual removendo a receita que acabou de ser desfavoritada
        this.receitas.update(listaAtual => listaAtual.filter(receita => receita.id !== id));
      },
      error: (err) => {
        console.error('Erro ao remover favorito:', err);
      }
    });
  }
}