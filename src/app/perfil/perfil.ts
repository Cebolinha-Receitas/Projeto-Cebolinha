import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../services/auth'; 
import { API_URL } from '../models/constants/api'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class Perfil implements OnInit {
  private router = inject(Router);
  private auth = inject(Auth);
  private http = inject(HttpClient); // Injetando o HttpClient para fazer requisições

  // Signal que vai guardar os dados para o HTML exibir
  usuario = signal<{ name: string, email: string} | null>(null);

  ngOnInit(): void {
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario(): void {
    const token = this.auth.token();
    
    if (token) {
      // 1. O Token JWT tem 3 partes separadas por ponto. O payload (dados) é a parte do meio [1].
      const payloadBase64 = token.split('.')[1];
      
      // 2. O atob() decodifica a base64 e o JSON.parse transforma de volta em objeto JavaScript.
      const payloadDecodificado = JSON.parse(atob(payloadBase64));
      
      // 3. Pegamos o ID (que no seu token vem dentro do campo "sub")
      const userId = payloadDecodificado.sub; 

      // 4. Fazemos o GET direto para a API
      this.http.get<{ name: string, email: string }>(`${API_URL}/users/${userId}`)
        .subscribe({
          next: (dados) => {
            this.usuario.set(dados); // Atualiza a tela instantaneamente
          },
          error: (erro) => {
            console.error('Erro ao buscar dados do usuário:', erro);
            // Nota: Se o token estiver vencido, o seu authInterceptor já vai interceptar
            // esse erro, deslogar a pessoa e mandar para a tela de login.
          }
      });
    }
  }

  onEditarDados(): void {
    this.router.navigate(['/editar-dados-conta']); 
  }

  onMinhasReceitas(): void {
    this.router.navigate(['/minhas-receitas']);
  }
}