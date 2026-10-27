import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-input',
  styleUrl: './Input.scss',
  templateUrl: './Input.html',
})
export class input {

  @Input() label: string = ""
  @Input() id: string = ""
  @Input() placeholder: string = ""
  @Input() type: string = ""
}
