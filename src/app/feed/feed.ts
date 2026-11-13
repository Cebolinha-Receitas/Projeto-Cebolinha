import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { blogItems } from '../mocks/blog.mock';
import { ReceitaService } from '../services/receita';
import { Receita } from '../models/receita';
import { CardReceita } from '../card-receita/card-receita';
import { finalize } from 'rxjs';

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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
  this.carregando = true;

  this.receitaService.listar()
    .pipe(
      finalize(() => {
        this.carregando = false;
      })
    )
    .subscribe({
      next: (dados) => {
  console.log('1. Dados recebidos:', dados.content.length);

  this.receitas = dados.content;

  console.log('2. Receitas atribuídas:', this.receitas.length);

  this.carregando = false;

  console.log('3. Carregando:', this.carregando);

  this.cdr.detectChanges();

  console.log('4. Elemento no HTML:', document.querySelectorAll('app-card-receita').length);
},
      error: (erro) => {
        console.error('Erro ao buscar receitas da API:', erro);
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