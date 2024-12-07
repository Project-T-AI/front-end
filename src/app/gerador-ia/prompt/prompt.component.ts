import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { GeradorIaService } from '.././gerador-ia.service';
import { PicLumenModelo, PicLumenModelosResponse } from '../gerador-ia.types';
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

  numEtapas: number = 25;
  qtdeImagens: number = 1;
  precisaAprimorar: any = true;

  constructor(
    private router:Router, 
    private geradorIaService: GeradorIaService) {}

  ngOnInit(): void {
    this.dispararChamadaCarregarModelos();
  }
  
  dispararChamadaCarregarModelos() {
    const modelos$ = this.geradorIaService.carregarModelos();

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

  selecionarQtdeEtapas(event: any) {
    this.qtdeImagens = Number(event.target.ariaLabel);
  }

  atualizarNumEtapas(event: any) {
    this.numEtapas = Number(event?.target?.value) || 25
  }

  validarTexto(event: any) {
    this.textoPrompt = event?.target?.value;
  }

  irParaProcessamento() {
    const contexto = {
      parametrosImagem: {
        modelId: this.modeloEscolhido?.modelId,
        textoPrompt: this.textoPrompt,
        altura: this.tamanhoEscolhido.height,
        largura: this.tamanhoEscolhido.width,
        numEtapas: this.numEtapas,
        qtdeImagens: this.qtdeImagens,
        precisaAprimorar: this.precisaAprimorar
      }
    };
    
    this.router.navigate(["gerador", "processamento"], {skipLocationChange: true, state: contexto});
  }

  voltarParaIntroducao() {
    this.router.navigate(["gerador", "introducao"], {skipLocationChange: true});
  }
}
