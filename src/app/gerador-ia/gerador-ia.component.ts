import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IntroducaoComponent } from './introducao/introducao.component';

@Component({
  selector: 'app-gerador-ia',
  standalone: true,
  imports: [CommonModule, IntroducaoComponent],
  templateUrl: './gerador-ia.component.html',
  styleUrl: './gerador-ia.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GeradorIaComponent {
  paginaIndex:number = 0;
  numPaginas:number = 5;

  proximo() {
    this.paginaIndex = Math.min(++this.paginaIndex, this.numPaginas - 1);
  }

  anterior() {
    this.paginaIndex = Math.max(--this.paginaIndex, 0);
  }
}