import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { blogItems } from '../mocks/blog.mock';
import { ReceitaService } from '../services/receita';
import { FavoritoService } from '../services/favorito';
import { Receita } from '../models/receita';
import { CardReceita } from '../card-receita/card-receita';
import { finalize, forkJoin, of, catchError } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CardReceita],
  styleUrl: './feed.scss',
  templateUrl: './feed.html',
})
export class Feed implements OnInit {
  private router = inject(Router);
  private receitaService = inject(ReceitaService);
  private favoritoService = inject(FavoritoService);
  private cdr = inject(ChangeDetectorRef);

  blogItems = blogItems;
  receitas: Receita[] = [];
  carregando: boolean = true;

  ngOnInit(): void {
    this.carregarReceitasComFavoritos();
  }

  carregarReceitasComFavoritos(): void {
    this.carregando = true;

    // Busca as receitas do feed e os favoritos do usuário em paralelo
    forkJoin({
      respostaReceitas: this.receitaService.listar(),
      favoritos: this.favoritoService.listarFavoritos().pipe(catchError(() => of([])))
    })
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: ({ respostaReceitas, favoritos }) => {
        // Cria um Set com os IDs de todas as receitas favoritadas pelo usuário
        const idsFavoritos = new Set(favoritos.map(f => f.id));

        // Mapeia as receitas injetando a propriedade isFavorito correspondente
        this.receitas = respostaReceitas.content.map(receita => ({
          ...receita,
          isFavorito: idsFavoritos.has(receita.id)
        }));
      },
      error: (erro) => {
        console.error('Erro ao carregar dados do feed:', erro);
      }
    });
  }

  onVoltar(): void {
    this.router.navigate(['cadastro-receitas']); 
  }

  verDetalhe(codigo: number): void {
    this.router.navigate(['/artigo', codigo]);
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