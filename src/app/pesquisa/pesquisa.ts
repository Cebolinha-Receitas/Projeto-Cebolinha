import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../services/receita'; // Ajuste o caminho
import { Receita, receitaResponse } from '../models/receita'; // Ajuste o caminho
import { CardReceita } from '../card-receita/card-receita'; // Ajuste o caminho

@Component({
  selector: 'app-pesquisa',
  imports: [CardReceita],
  templateUrl: './pesquisa.html' 
})
export class PesquisaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private receitaService = inject(ReceitaService);

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
    
    this.receitaService.pesquisar(termo).subscribe({
      next: (dados: receitaResponse) => {
        this.receitas.set(dados.content);
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
}