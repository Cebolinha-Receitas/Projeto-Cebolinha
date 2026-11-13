import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarCategoria',
  standalone: true
})
export class FormatarCategoriaPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    
    // Substitui o underline por espaço e capitaliza cada palavra
    return value
      .split('_')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
      .join(' ');
  }
}