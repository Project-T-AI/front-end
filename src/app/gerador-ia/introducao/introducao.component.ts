import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-introducao',
  standalone: true,
  imports: [],
  templateUrl: './introducao.component.html',
  styleUrl: './introducao.component.less'
})
export class IntroducaoComponent {
  constructor(private router:Router) {

  }

  irParaTelaDePrompt() {
    this.router.navigate(["gerador", "prompt"], {skipLocationChange: true});
  }
}
