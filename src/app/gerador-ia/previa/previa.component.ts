import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PromptService } from '../prompt/prompt.service';
import { PicLumenCreatePayload, PicLumenCreateResponse, PicLumenImagem, PicLumenProcessTaskPayload, PicLumenProcessTaskResponse } from '../prompt/prompt.types';
import { repeat, skipWhile, take } from 'rxjs';
import * as seedrandom from 'seedrandom';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-previa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previa.component.html',
  styleUrl: './previa.component.less'
})
export class PreviaComponent implements OnInit {
  imagensDisponiveis: PicLumenImagem[] = [];
  imagemEscolhida: PicLumenImagem = null;

  constructor(private router:Router, private promptService: PromptService) {
    this.carregarParametrosImagem();
  }
  
  carregarParametrosImagem() {
    console.log(this.router.getCurrentNavigation()?.extras.state);
  
  }
  ngOnInit() {    
    //this.dispararChamadaGerarImagem();
  }

  dispararChamadaGerarImagem() {
    const parametros:PicLumenCreatePayload = {
      "model_id": "cb4af9c7-41b0-47d3-944a-221446c7b8bc",
      "prompt": "Anime art of a samuri holding a big hammer",
      "negative_prompt": "(nsfw:0.7), (worst quality:1.5), (low quality:1.5), (normal quality:1.5), lowres,watermark, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, username, blurry, artist name",
      "resolution": {
          "width": 1024,
          "height": 1024,
          "batch_size": 1
      },
      "model_ability": {
          "anime_style_control": null
      },
      "seed": 36593437589,
      "steps": 25,
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

    const prompt$ = this.promptService.gerarImagem(parametros);

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
    const parametros: PicLumenProcessTaskPayload = new FormData();
    parametros.append("markId", retorno?.data?.markId);
    const imagem$ = this.promptService.baixarImagem(parametros);

    imagem$.pipe(
      repeat({delay: 3000}),
      skipWhile((retorno) => retorno?.data?.status != "success"),
      take(1)
    ).subscribe({
      next: (retorno: PicLumenProcessTaskResponse) => this.acompanharStatusImagemSucesso(retorno),
      error: (err: any) => this.acompanharStatusImagemErro(),
    })
  }

  acompanharStatusImagemSucesso(retorno: PicLumenProcessTaskResponse) {
    this.imagensDisponiveis = retorno?.data?.img_urls;
    this.imagemEscolhida = this.imagensDisponiveis?.[0];
  }

  acompanharStatusImagemErro() {

  }

  voltarParaPrompt() {
    this.router.navigate(["gerador", "prompt"], {skipLocationChange: true})
  }
}
