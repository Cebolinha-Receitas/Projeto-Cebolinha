import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../input/input';
import { Auth } from '../services/auth';

@Component({
  imports: [InputComponent, ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  carregando = signal(false);
  erro = signal('');
  sucesso = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]],
  });

  entrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erro.set('Preencha um email válido e a senha.');
      return;
    }

    this.carregando.set(true);
    this.erro.set('');
    this.sucesso.set('');

    const { email, senha } = this.form.getRawValue();

    this.auth.login({ email, password: senha }).subscribe({
      next: () => {
        this.carregando.set(false); // Desliga o botão de carregamento
        this.form.reset(); // Limpa os campos preenchidos
        this.sucesso.set('Login realizado com sucesso!'); 
    
        // Espera 3 segundos e joga o usuário para o login
        setTimeout(() => {
          this.router.navigate(['/feed']);
        }, 3000);
      },
      error: (e: HttpErrorResponse) => {
        this.carregando.set(false);
        if (e.status === 0) {
          this.erro.set('Não foi possível falar com o servidor. A API está rodando?');
        } else if (e.status === 400 || e.status === 401 || e.status === 403) {
          this.erro.set('Email ou senha inválidos.');
        } else {
          this.erro.set('Algo deu errado. Tente novamente em instantes.');
        }
      },
    });
  }
}