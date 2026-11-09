import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { API_URL } from '../models/constants/api';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth';

const CHAVE_TOKEN = 'cebolinha.token';
const CHAVE_EXPIRA = 'cebolinha.expira';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);

  // Faz o login e, se der certo, guarda o token no navegador
  login(dados: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, dados)
      .pipe(tap((resposta) => this.salvarSessao(resposta)));
  }

  // Cria uma conta nova (POST /users)
  cadastrar(dados: RegisterRequest) {
    return this.http.post<unknown>(`${API_URL}/users`, dados);
  }

  logout() {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_EXPIRA);
  }

  token(): string | null {
    return localStorage.getItem(CHAVE_TOKEN);
  }

  // Usado pelo guard para decidir se a pessoa pode entrar nas telas protegidas
  isLoggedIn(): boolean {
    if (!this.token()) return false;

    const expira = Number(localStorage.getItem(CHAVE_EXPIRA));
    if (expira && Date.now() > expira) {
      this.logout();
      return false;
    }
    return true;
  }

  private salvarSessao(resposta: LoginResponse) {
    localStorage.setItem(CHAVE_TOKEN, resposta.token);
    localStorage.setItem(CHAVE_EXPIRA, String(Date.now() + resposta.expiresIn * 1000));
  }
}