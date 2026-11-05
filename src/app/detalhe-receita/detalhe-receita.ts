import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceitaService } from '../services/receita';
import { Receita } from '../models/receita';
import { RECIPE_EMPTY } from '../models/constants/emptyRecipe';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-detalhe-receita',
  styleUrl: './detalhe-receita.scss',
  templateUrl: './detalhe-receita.html',
})
export class DetalheReceita {
  private route = inject(ActivatedRoute);
  private receitaService = inject(ReceitaService);
  receita: Receita = RECIPE_EMPTY;
  carregando: boolean = true;
  
  id = this.route.snapshot.paramMap.get('id')?.toString()

  ngOnInit(): void {
    if (!this.id) return

    this.carregarDados(this.id)
  }

  carregarDados(id: string): void {
    this.receitaService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.receita = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao buscar a receita:', erro);
        this.carregando = false;
      }
    });
  }
}
