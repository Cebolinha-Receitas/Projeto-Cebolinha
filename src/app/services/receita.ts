import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../models/receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/recipes';

  // GET - Lista todas as receitas para o Feed
  listar(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.API_URL);
  }

  // GET - Busca uma receita específica por ID
  buscarPorId(id: string): Observable<Receita> {
    return this.http.get<Receita>(`${this.API_URL}/${id}`);
  }

  // POST - Cadastra nova receita enviando o JSON ('data') e a foto opcional ('photo')
  cadastrar(receita: Partial<Receita>, foto?: File): Observable<void> {
    const formData = new FormData();
    
    // Converte o objeto da receita em Blob de JSON para atender o @RequestPart("data") do Spring
    const jsonBlob = new Blob([JSON.stringify(receita)], { type: 'application/json' });
    formData.append('data', jsonBlob);

    if (foto) {
      formData.append('photo', foto);
    }

    return this.http.post<void>(this.API_URL, formData);
  }

  // PUT - Atualiza receita existente
  atualizar(id: string, receita: Partial<Receita>, foto?: File): Observable<Receita> {
    const formData = new FormData();

    const jsonBlob = new Blob([JSON.stringify(receita)], { type: 'application/json' });
    formData.append('data', jsonBlob);

    if (foto) {
      formData.append('photo', foto);
    }

    return this.http.put<Receita>(`${this.API_URL}/${id}`, formData);
  }

  // DELETE - Exclui uma receita por ID
  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}