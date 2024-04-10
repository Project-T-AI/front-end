import { MenuInferiorComponent } from './menu-inferior/menu-inferior.component';
import { HomeComponent } from './home/home.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    imports: [
      CommonModule,
      RouterOutlet, 
      MenuInferiorComponent,
      HomeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppComponent {
  title = 'front-end';
  jornada:string = "home";
  quantidadeCarrinho:number = 1;

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.carregarTema();
  }

  atualizarJornada(jornada:string) {
    this.router.navigate([jornada], { skipLocationChange: true });
  }

  carregarTema() {
    const tema = localStorage.getItem("tema") || "autumn";
    document.getElementsByTagName("html")[0].setAttribute("data-theme", tema);
    let themeColor =  document.querySelector("meta[name='theme-color']");
    
    if(!themeColor) return;
    
    if(tema == "autumn") themeColor.setAttribute('content',  '#F1F1F1');
    else themeColor.setAttribute('content',  '#121c22');
  }
}
