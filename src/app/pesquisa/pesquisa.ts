import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../services/receita'; 
import { FavoritoService } from '../services/favorito'; 
import { Receita, receitaResponse } from '../models/receita'; 
import { CardReceita } from '../card-receita/card-receita'; 
import { forkJoin, of, catchError } from 'rxjs';

@Component({
  selector: 'app-pesquisa',
  imports: [CardReceita],
  templateUrl: './pesquisa.html' 
})
export class PesquisaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private receitaService = inject(ReceitaService);
  private favoritoService = inject(FavoritoService);

  receitas = signal<Receita[]>([]);
  carregando = signal(false);
  termoPesquisado = signal('');

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const termo = params['q'];
      if (termo) {
        this.termoPesquisado.set(termo);
        this.buscarReceitas(termo);
      }
    });
  }

  buscarReceitas(termo: string) {
    this.carregando.set(true);
    
    // Busca a pesquisa e os favoritos em paralelo para cruzar os dados
    forkJoin({
      respostaPesquisa: this.receitaService.pesquisar(termo),
      favoritos: this.favoritoService.listarFavoritos().pipe(catchError(() => of([])))
    }).subscribe({
      next: ({ respostaPesquisa, favoritos }) => {
        const idsFavoritos = new Set(favoritos.map(f => f.id));

        const receitasComFavorito = respostaPesquisa.content.map(receita => ({
          ...receita,
          isFavorito: idsFavoritos.has(receita.id)
        }));

        this.receitas.set(receitasComFavorito);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao pesquisar:', erro);
        this.receitas.set([]);
        this.carregando.set(false);
      }
    });
  }

  verDetalheReceita(id?: string): void {
    if (id) {
      this.router.navigate(['/detalhe-receita', id]);
    }
  }

  favoritarReceita(id: string | undefined, favoritado: boolean): void {
    if (!id) return;
    
    if (favoritado) {
      this.favoritoService.adicionarFavorito(id).subscribe({
        error: (err) => console.error('Erro ao favoritar:', err)
      });
    } else {
      this.favoritoService.removerFavorito(id).subscribe({
        error: (err) => console.error('Erro ao remover favorito:', err)
      });
    }
  }
}