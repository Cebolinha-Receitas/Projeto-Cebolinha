import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideCaseSensitive, LucideHeart, LucideSearch, LucideUser } from '@lucide/angular';

@Component({
  imports: [RouterOutlet, LucideHeart, LucideSearch, LucideUser, LucideCaseSensitive, RouterLink],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('projetocebolinha');
}
