import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideLucideIcons, LucideCaseSensitive, LucideHeart, LucideSearch, LucideUser } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Registra os ícones usando PascalCase pré-fixado com Lucide:
    provideLucideIcons(LucideCaseSensitive, LucideHeart, LucideSearch, LucideUser)
  ]
};
