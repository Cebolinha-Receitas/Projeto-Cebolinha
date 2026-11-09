import { Component, inject, signal } from '@angular/core';
import {InputComponent} from '../input/input'
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [InputComponent, ReactiveFormsModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  carregando = signal(false);
  erro = signal('');
  sucesso = signal('');

  isSenhasIguais: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('senha');
    const confirmPassword = control.get('confirmarSenha');

    // Se os campos ainda não foram inicializados, não aplica o erro
    if (!password || !confirmPassword) {
      return null;
    }

    // Se os valores forem diferentes, retorna o objeto de erro. Se forem iguais, retorna null (válido).
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmarSenha: ['', [Validators.required]]
  }, {
    validators: this.isSenhasIguais
  });

  cadastrar(){

    //Verifica se todos os campos estão preenchidos de maneira válida
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.erro.set('Preencha um email válido e a senha.');
      return;
      }

    //Após a verificação, começa a carregar, e limpa os erros anteriores.
    this.carregando.set(true);
    this.erro.set('');
    this.sucesso.set('');

    // Extrai exatamente o que precisa, o confirmarSenha é naturalmente ignorado
    const { nome, email, senha } = this.form.getRawValue();

    // Mapeia as variáveis em português para o formato em inglês da API
    this.auth.cadastrar({ name: nome, email, password: senha }).subscribe({
     next: () => {
      this.carregando.set(false); // Desliga o botão de carregamento
      this.form.reset(); // Limpa os campos preenchidos
      this.sucesso.set('Cadastro realizado, redirecionando para o login...'); 
    
        // Espera 3 segundos e joga o usuário para o login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (e: HttpErrorResponse) => {
        this.carregando.set(false);
        if (e.status === 0) {
          this.erro.set('Não foi possível falar com o servidor. A API está rodando?');
        } else if (e.status === 400 || e.status === 409) {
          this.erro.set('Este email já está em uso ou os dados são inválidos.');
        } else {
          this.erro.set('Algo deu errado. Tente novamente em instantes.');
        }
      },
    });
  }
}
