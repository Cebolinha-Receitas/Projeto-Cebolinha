import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceitaService } from '../services/receita';
import { Receita } from '../models/receita';
import { RECIPE_EMPTY } from '../models/constants/emptyRecipe';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormatarCategoriaPipe } from '../pipes/formatar-categoria-pipe';


@Component({
  imports: [CommonModule, FormatarCategoriaPipe],
  selector: 'app-detalhe-receita',
  styleUrl: './detalhe-receita.scss',
  templateUrl: './detalhe-receita.html',
})
export class DetalheReceita {
  private route = inject(ActivatedRoute);
  private receitaService = inject(ReceitaService);
  private cdr = inject(ChangeDetectorRef);

  receita: Receita = RECIPE_EMPTY;
  carregando: boolean = true;
  
  id = this.route.snapshot.paramMap.get('codigo')?.toString();

  ngOnInit(): void {
    if (!this.id) {
      this.carregando = false;
      return;
    }

    this.carregarDados(this.id);
  }

  carregarDados(id: string): void {
    this.carregando = true;

    this.receitaService.buscarPorId(id)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (dados) => {
          this.receita = dados;
        },
        error: (erro) => {
          console.error('Erro ao buscar a receita:', erro);
        }
      });
  }
}