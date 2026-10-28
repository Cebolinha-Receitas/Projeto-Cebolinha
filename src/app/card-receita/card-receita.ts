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
  @Output() favoritoClick = new EventEmitter<void>();

  onVerReceita(): void {
    this.verReceitaClick.emit();
  }

  onToggleFavorito(): void {
    this.favoritoClick.emit();
  }
}
