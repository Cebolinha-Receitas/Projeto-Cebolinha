import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class Perfil {
  private router = inject(Router);

  onEditarDados(): void {
    this.router.navigate(['/editar-dados-conta']); 
  }

  onMinhasReceitas(): void {
    this.router.navigate(['/minhas-receitas']);
  }
}