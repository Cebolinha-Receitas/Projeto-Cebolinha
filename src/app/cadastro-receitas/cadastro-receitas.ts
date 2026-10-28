import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-receita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-receitas.html',
  styleUrls: ['./cadastro-receitas.scss']
})
export class CadastroReceitas {
  private fb = inject(FormBuilder);
  
  receitaForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    categoria: ['', Validators.required],
    descricao: ['', Validators.required],
    ingredientes: ['', Validators.required],
    passoAPasso: ['', Validators.required],
    foto: [null] 
  });

  onSubmit(): void {
    if (this.receitaForm.valid) {
      console.log('Dados do formulário:', this.receitaForm.value);
    } else {
      this.receitaForm.markAllAsTouched();
    }
  }

  private router = inject(Router); 

  onVoltar(): void {
    this.router.navigate(['feed']); 
  }
}