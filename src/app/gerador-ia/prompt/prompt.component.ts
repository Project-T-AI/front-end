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

  hashtagDigitada: string = "";
  hashtags: string[] = [];

  maxQtdeImagens:number = 4;
  qtdeImagens: number = 1;

  numEtapas: number = 25;
  precisaAprimorar: any = false;

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

  validarHashtag(event: any) {
    this.hashtagDigitada = String(event?.target?.value);
  }

  adicionarHashtag() {
    this.hashtags.push(this.hashtagDigitada);
    this.hashtagDigitada = "";
  }

  removerHashtag(index: number) {
    this.hashtags.splice(index, 1);
  }

  selecionarModelo(event: any) {
    const modelId = event?.target?.value;
    this.modeloEscolhido = this.modelosDisponiveis.find((modelo) => {
      return modelo?.modelId == modelId;
    }) || this.modelosDisponiveis?.[0];

    this.limitarQtdeImagens();    
  }

  limitarQtdeImagens() {
    //Este modelo suporta apenas 2 imagens geradas por vez
    if(this.modeloEscolhido?.modelId == "23887bba-507e-4249-a0e3-6951e4027f2b") {
      this.qtdeImagens = Math.min(this.qtdeImagens, 2);
      this.maxQtdeImagens = 2;
    } else {
      this.maxQtdeImagens = 4;
    }
  }

  selecionarTamanho(event: any) {
    const aspectRatio = event?.target?.value;
    this.tamanhoEscolhido = this.tamanhosDisponiveis.find((modelo) => {
      return modelo?.aspectRatio == aspectRatio;
    }) || this.tamanhosDisponiveis?.[0];
  }

  selecionarQtdeImagens(event: any) {
    this.qtdeImagens = Number(event.target.ariaLabel);
  }

  atualizarNumEtapas(event: any) {
    this.numEtapas = Number(event?.target?.value) || 25
  }

  validarTexto(event: any) {
    this.textoPrompt = event?.target?.value;
  }

  irParaProcessamento() {
    let textoHashtags = "";
    if(this.hashtags.length) {
      textoHashtags = "Considere a imagem com os seguintes elementos artísticos de " + this.hashtags.join(", ") + ". ";
    }
    const contexto = {
      parametrosImagem: {
        modelId: this.modeloEscolhido?.modelId,
        textoPrompt: textoHashtags + this.textoPrompt,
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
