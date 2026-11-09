import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_URL } from '../models/constants/api';
import { Auth } from './auth';

/**
 * Interceptor funcional do Angular.
 * Ele atua como um "pedágio" que intercepta todas as requisições HTTP que saem da aplicação
 * e todas as respostas que voltam do servidor.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Injeção de dependências (serviço de autenticação e roteador)
  const auth = inject(Auth);
  const router = inject(Router);

  // Variáveis de controle para saber o destino e o tipo da requisição
  const ehDaApi = req.url.startsWith(API_URL); // Verifica se a requisição está indo para o nosso back-end
  const ehLogin = req.url.endsWith('/auth/login'); // Verifica se é a rota de login (que não precisa de token)
  const ehCadastro = req.url.endsWith('/users') && req.method === 'POST'; // Verifica se é a rota de cadastro
  
  const token = auth.token(); // Resgata o token salvo (ex: do localStorage)

  // Se o usuário tem token, a requisição é para nossa API e NÃO é login e NÃO é cadastro:
  // Clonamos a requisição original e injetamos o cabeçalho de Autorização.
  // Caso contrário, enviamos a requisição original (req) sem modificações.
  const requisicao =
    token && ehDaApi && !ehLogin && !ehCadastro
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  // Envia a requisição adiante (next) e intercepta o retorno (pipe)
  return next(requisicao).pipe(
    catchError((erro: HttpErrorResponse) => {
      // Verifica se o erro retornado pelo back-end é 401 (Não Autorizado/Token Vencido)
      // e garante que não estamos interceptando um erro da própria tentativa de login ou cadastro
      if (erro.status === 401 && ehDaApi && !ehLogin && !ehCadastro) {
        auth.logout(); // Limpa o token e dados da sessão no front-end
        router.navigate(['/login']); // Redireciona o usuário de volta para a tela de login
      }
      
      // Repassa o erro para frente para que o componente que fez a requisição possa tratá-lo, se necessário
      return throwError(() => erro);
    }),
  );
};