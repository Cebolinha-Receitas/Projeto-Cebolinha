import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../models/receita'; // Ajuste o caminho do seu model

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/favorites';

  // GET - Lista todas as receitas favoritas do usuário logado
  listarFavoritos(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.API_URL);
  }

  // POST - Adiciona uma receita aos favoritos
  adicionarFavorito(recipeId: string): Observable<void> {
    // O Swagger espera um body com o formato { "recipeId": "string" }
    return this.http.post<void>(this.API_URL, { recipeId });
  }

  // DELETE - Remove uma receita dos favoritos
  removerFavorito(recipeId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${recipeId}`);
  }
}