import { CommonModule } from '@angular/common';
import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-inferior',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './menu-inferior.component.html',
  styleUrl: './menu-inferior.component.less'
})
export class MenuInferiorComponent {
  @Input() quantidadeCarrinho:number = 0;
  @Output() jornadaEscolhida = new EventEmitter<string>();

  jornada:string = 'home';

  constructor() {
    
  }

  navegar(jornada:string) {
    this.jornada = jornada;
    this.jornadaEscolhida.emit(jornada);
  }
}
