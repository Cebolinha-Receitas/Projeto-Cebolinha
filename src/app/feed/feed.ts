import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { blogItems } from '../mocks/blog.mock';
import { ReceitaService } from '../services/receita';
import { Receita } from '../models/receita';
import { CardReceita } from '../card-receita/card-receita';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CardReceita],
  styleUrl: './feed.scss',
  templateUrl: './feed.html', // Corrigido de ./card-receita.html para ./feed.html
})
export class Feed implements OnInit { // Nome da classe mantido como Feed
  private router = inject(Router);
  private receitaService = inject(ReceitaService);

  blogItems = blogItems;
  receitas: Receita[] = [];
  carregando: boolean = true;

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    this.receitaService.listar().subscribe({
      next: (dados) => {
        this.receitas = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao buscar receitas da API:', erro);
        this.carregando = false;
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
}