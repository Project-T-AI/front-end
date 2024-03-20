import { MenuInferiorComponent } from './menu-inferior/menu-inferior.component';
import { HomeComponent } from './home/home.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EditorMockupComponent } from "./editor-mockup/editor-mockup.component";
import { GeradorIaComponent } from './gerador-ia/gerador-ia.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    imports: [CommonModule, RouterOutlet, HomeComponent, GeradorIaComponent, MenuInferiorComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppComponent {
  title = 'front-end';
  
  jornada:string = "home";
  quantidadeCarrinho:number = 1;

  constructor() {
  }

  atualizarJornada(jornada:string) {
    this.jornada = jornada;
  }
}
