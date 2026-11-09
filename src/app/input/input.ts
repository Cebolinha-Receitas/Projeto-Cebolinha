import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-input',
  styleUrl: './Input.scss',
  templateUrl: './Input.html',
  // Isso avisa o Angular que este componente pode ser usado com formControlName / ngModel
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';

  valor = '';
  desabilitado = false;

  private aoMudar: (valor: string) => void = () => {};
  aoTocar: () => void = () => {};

  // O formulário escreve um valor dentro do input
  writeValue(valor: string | null): void {
    this.valor = valor ?? '';
  }

  registerOnChange(fn: (valor: string) => void): void {
    this.aoMudar = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.aoTocar = fn;
  }

  setDisabledState(desabilitado: boolean): void {
    this.desabilitado = desabilitado;
  }

  // Chamado a cada letra digitada: avisa o formulário do novo valor
  aoDigitar(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.valor = valor;
    this.aoMudar(valor);
  }
}