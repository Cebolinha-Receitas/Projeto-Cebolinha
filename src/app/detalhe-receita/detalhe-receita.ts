import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-detalhe-receita',
  styleUrl: './detalhe-receita.scss',
  templateUrl: './detalhe-receita.html',
})
export class DetalheReceita {
  private route = inject(ActivatedRoute);
}
