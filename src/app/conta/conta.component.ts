import { Component } from '@angular/core';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.less'
})
export class ContaComponent {
  tema: string;

  constructor() {
    this.tema = localStorage.getItem("tema") || "autumn";
  }

  trocarTema() {
    if(this.tema == "sunset") {
      this.tema = "autumn";
    } else {
      this.tema = "sunset";
    }
    localStorage.setItem("tema", this.tema);
    document.getElementsByTagName("html")[0].setAttribute("data-theme", this.tema);

    let themeColor =  document.querySelector("meta[name='theme-color']");
    
    if(!themeColor) return;
    
    if(this.tema == "autumn") themeColor.setAttribute('content',  '#F1F1F1');
    else themeColor.setAttribute('content',  '#121c22');
  }
}
