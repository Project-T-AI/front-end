import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { PromptService } from './prompt.service';
import { PicLumenModelo, PicLumenModelosResponse } from './prompt.types';
import { TAMANHOS } from './prompt.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PromptComponent implements OnInit {
  textoPrompt: string = "";

  modelosDisponiveis: PicLumenModelo[] = [];
  modeloEscolhido: PicLumenModelo = null;

  tamanhosDisponiveis = TAMANHOS;
  tamanhoEscolhido = TAMANHOS[0];

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private promptService: PromptService) {}

  ngOnInit(): void {
    this.dispararChamadaCarregarModelos();
  }
  
  dispararChamadaCarregarModelos() {
    const modelos$ = this.promptService.carregarModelos();

    modelos$.subscribe({
      next: (retorno) => this.carregarModelosSucesso(retorno),
      error: (err) => this.carregarModelosErro(err)
    });
  }

  carregarModelosSucesso(retorno: PicLumenModelosResponse) {
    this.modelosDisponiveis = retorno?.data;
    this.modeloEscolhido = this.modelosDisponiveis?.[0];
  }

  carregarModelosErro(err: any) {
    
  }

  selecionarModelo(event: any) {
    const modelId = event?.target?.value;
    this.modeloEscolhido = this.modelosDisponiveis.find((modelo) => {
      return modelo?.modelId == modelId;
    }) || this.modelosDisponiveis?.[0];
  }

  selecionarTamanho(event: any) {
    const aspectRatio = event?.target?.value;
    this.tamanhoEscolhido = this.tamanhosDisponiveis.find((modelo) => {
      return modelo?.aspectRatio == aspectRatio;
    }) || this.tamanhosDisponiveis?.[0];
  }

  validarTexto(event: any) {
    this.textoPrompt = event?.target?.value;
  }

  irParaPrevia() {
    const parametrosPrevia = {
      textoPrompt: this.textoPrompt
    };
    
    this.router.navigate(["gerador", "previa"], {skipLocationChange: true, state: parametrosPrevia});
  }

  voltarParaIntroducao() {
    this.router.navigate(["gerador", "introducao"], {skipLocationChange: true});
  }
}
