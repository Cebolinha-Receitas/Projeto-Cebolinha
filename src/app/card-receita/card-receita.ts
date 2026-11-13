import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-receita',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-receita.html',
  styleUrls: ['./card-receita.scss']
})
export class CardReceita {
  @Input({ required: true }) imagemUrl!: string;
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) descricao!: string;
  @Input() isFavorito: boolean = false;

  @Output() verReceitaClick = new EventEmitter<void>();
  // Atualizado para emitir o novo estado (true/false) para o componente pai
  @Output() favoritoClick = new EventEmitter<boolean>(); 

  onVerReceita(): void {
    this.verReceitaClick.emit();
  }

  onToggleFavorito(): void {
    // Inverte o estado atual (se era false vira true, mudando a cor na hora)
    this.isFavorito = !this.isFavorito;
    
    // Envia o novo estado para a tela (Feed/Pesquisa) saber se deve salvar ou deletar
    this.favoritoClick.emit(this.isFavorito);
  }
}