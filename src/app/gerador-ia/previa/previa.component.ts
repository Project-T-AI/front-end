import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeradorIaService } from '../gerador-ia.service';
import { PicLumenCreatePayload, PicLumenCreateResponse, PicLumenImagem, PicLumenProcessTaskPayload, PicLumenProcessTaskResponse } from '../gerador-ia.types';
import { finalize, repeat, skipWhile, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-previa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previa.component.html',
  styleUrl: './previa.component.less'
})
export class PreviaComponent implements OnInit {
  contexto: any;

  imagensDisponiveis: PicLumenImagem[] = [];
  imagemEscolhida: PicLumenImagem = null;

  constructor(
    private router:Router, 
    private geradorIaService: GeradorIaService
  ) {
    this.carregarContexto();
  }
  
  carregarContexto() {
    this.contexto = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.carregarImagens();
  }

  carregarImagens() {
    this.imagensDisponiveis = this.contexto?.imagensDisponiveis;
    this.imagemEscolhida = this.imagensDisponiveis[0];
  }

  voltarParaPrompt() {
    this.router.navigate(["gerador", "prompt"], {skipLocationChange: true});
  }
}
