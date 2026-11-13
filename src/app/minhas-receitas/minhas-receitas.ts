import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReceitaService } from '../services/receita';
import { Receita } from '../models/receita';
import { CardReceita } from '../card-receita/card-receita';

@Component({
  selector: 'app-minhas-receitas',
  imports: [CardReceita],
  templateUrl: './minhas-receitas.html',
})
export class MinhasReceitas implements OnInit {
  private receitaService = inject(ReceitaService);
  private router = inject(Router);

  receitas = signal<Receita[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  ngOnInit(): void {
    this.receitaService.listarMinhas().subscribe({
      next: (dados) => {
        this.receitas.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar suas receitas. Tente novamente.');
        this.carregando.set(false);
      },
    });
  }

verDetalheReceita(id?: string): void {
  console.log('O botão foi clicado! ID recebido:', id); // Adicione esta linha
  
  if (id) {
    this.router.navigate(['/detalhe-receita', id]);
  } else {
    console.log('O ID chegou vazio ou indefinido.');
  }
}
}