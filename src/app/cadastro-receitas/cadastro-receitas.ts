import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceitaService } from '../services/receita';

@Component({
  selector: 'app-cadastro-receitas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-receitas.html',
  styleUrl: './cadastro-receitas.scss'
})
export class CadastroReceitas {
  private fb = inject(FormBuilder);
  private receitaService = inject(ReceitaService);
  private router = inject(Router);

  fotoSelecionada?: File;
  fotoNome: string = '';
  enviando = false;

  receitaForm = this.fb.group({
    titulo: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    descricao: [''],
    ingredientes: ['', [Validators.required]],
    passoAPasso: ['', [Validators.required]]
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fotoSelecionada = input.files[0];
      this.fotoNome = this.fotoSelecionada.name;
    }
  }

  onSubmit(): void {
    if (this.receitaForm.invalid) {
      this.receitaForm.markAllAsTouched();
      return;
    }

    this.enviando = true;

    // Mapeamento dos campos do formulário em português para o DTO esperado no Spring
    const payload = {
      title: this.receitaForm.value.titulo,
      category: this.receitaForm.value.categoria,
      description: this.receitaForm.value.descricao,
      ingredients: this.receitaForm.value.ingredientes,
      steps: this.receitaForm.value.passoAPasso
    };

    this.receitaService.cadastrar(payload as any, this.fotoSelecionada).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar receita:', err);
        this.enviando = false;
      }
    });
  }

  onVoltar(): void {
    this.router.navigate(['/feed']);
  }
}