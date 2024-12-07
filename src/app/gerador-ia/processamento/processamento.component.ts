import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, repeat, skipWhile, take } from 'rxjs';
import * as seedrandom from 'seedrandom';
import { GeradorIaService } from '../gerador-ia.service';
import { PicLumenCreatePayload, PicLumenCreateResponse, PicLumenImagem, PicLumenProcessTaskPayload, PicLumenProcessTaskResponse, PicLumenTranslateResponse } from '../gerador-ia.types';


@Component({
  selector: 'app-processamento',
  standalone: true,
  imports: [],
  templateUrl: './processamento.component.html',
  styleUrl: './processamento.component.less'
})
export class ProcessamentoComponent implements OnInit {
  contexto: any;
  parametrosImagem: any;
  rng: any;

  imagensDisponiveis: PicLumenImagem[] = [];
  imagemEscolhida: PicLumenImagem = null;
  
  exibeLoader: boolean = true;
  textoLoader: string = "";

  constructor(
    private router:Router, 
    private geradorIaService: GeradorIaService
  ) {
    this.carregarContexto();
  }
  
  carregarContexto() {
    this.contexto = this.router.getCurrentNavigation()?.extras.state;
    this.parametrosImagem = this.contexto?.parametrosImagem;
  }

  ngOnInit() {
    this.dispararChamadaTraduzir();
  }

  dispararChamadaTraduzir() {
    this.textoLoader = "Traduzindo texto";
    const traducao$ = this.geradorIaService.traduzir(this.parametrosImagem?.textoPrompt);

    traducao$.subscribe({
      next: (retorno: PicLumenTranslateResponse) => this.traduzirSucesso(retorno),
      error: (err) => this.traduzirSucesso({
        data: this.parametrosImagem?.textoPrompt,
        message: "failure",
        status: 1
      })
    })
  }

  traduzirSucesso(retorno: PicLumenTranslateResponse) {
    this.parametrosImagem.textoPrompt = retorno?.data;
    this.dispararChamadaAprimorar();
  }

  dispararChamadaAprimorar() {
    if(!this.parametrosImagem?.precisaAprimorar) {
      this.dispararChamadaGerarImagem();
      return;
    }

    this.textoLoader = "Aprimorando texto";
    const aprimorar$ = this.geradorIaService.aprimorar(this.parametrosImagem?.textoPrompt);

    aprimorar$.subscribe({
      next: (retorno: PicLumenTranslateResponse) => this.aprimorarSucesso(retorno),
      error: (err) => this.aprimorarSucesso({
        data: this.parametrosImagem?.textoPrompt,
        message: "failure",
        status: 1
      })
    })
  }

  aprimorarSucesso(retorno: PicLumenTranslateResponse) {
    this.parametrosImagem.textoPrompt = retorno.data;
    this.dispararChamadaGerarImagem();
  }

  dispararChamadaGerarImagem() {
    this.textoLoader = "Solicitando criação da imagem";
    const rng = seedrandom.alea(Math.random() + "");
    let seed = rng.int32();
    if(seed < 0) seed *= -1;

    const parametros:PicLumenCreatePayload = {
      "model_id": this.parametrosImagem?.modelId,
      "prompt": this.parametrosImagem?.textoPrompt,
      "negative_prompt": "(nsfw:0.7), (worst quality:1.5), (low quality:1.5), (normal quality:1.5), lowres,watermark, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, username, blurry, artist name",
      "resolution": {
          "width": this.parametrosImagem?.largura,
          "height": this.parametrosImagem?.altura,
          "batch_size": this.parametrosImagem?.qtdeImagens
      },
      "model_ability": {
          "anime_style_control": null
      },
      "seed": seed,
      "steps": this.parametrosImagem?.numEtapas,
      "cfg": 7,
      "sampler_name": "euler_ancestral",
      "scheduler": "karras",
      "ponyTags": {},
      "denoise": 1,
      "hires_fix_denoise": 0.5,
      "hires_scale": 2,
      "gen_mode": "quality",
      "img2img_info": {
          "weight": 0
      }
  }

    const prompt$ = this.geradorIaService.gerarImagem(parametros);

    prompt$.subscribe({
      next: (retorno: PicLumenCreateResponse) => this.gerarImagemSucesso(retorno),
      error: (err: any) => this.gerarImagemErro(),
    })
  }

  gerarImagemSucesso(retorno: PicLumenCreateResponse) {
    this.dispararAcompanharStatusImagem(retorno);
  }

  gerarImagemErro() {

  }

  dispararAcompanharStatusImagem(retorno: PicLumenCreateResponse) {
    this.textoLoader = "Status do processamento: Novo";
    const parametros: PicLumenProcessTaskPayload = new FormData();
    parametros.append("markId", retorno?.data?.markId);
    const imagem$ = this.geradorIaService.baixarImagem(parametros);

    imagem$.pipe(
      repeat({delay: 3000}),
      skipWhile((retorno) => {
        this.textoLoader = `Status do processamento: ${retorno?.data?.status}`;
        return retorno?.data?.status != "success" && retorno?.data?.status != "failure"
      }),
      take(1),
      finalize(() => {this.exibeLoader = false;})
    ).subscribe({
      next: (retorno: PicLumenProcessTaskResponse) => this.acompanharStatusImagemSucesso(retorno),
      error: (err: any) => this.acompanharStatusImagemErro(),
    })
  }

  acompanharStatusImagemSucesso(retorno: PicLumenProcessTaskResponse) {
    this.imagensDisponiveis = retorno?.data?.img_urls;
    this.imagemEscolhida = this.imagensDisponiveis?.[0];
    this.irParaPrevia();
  }

  acompanharStatusImagemErro() {

  }

  irParaPrevia() {
    const contexto = {imagensDisponiveis: this.imagensDisponiveis};
    this.router.navigate(["gerador", "previa"], {skipLocationChange: true, state: contexto});
  }
}
