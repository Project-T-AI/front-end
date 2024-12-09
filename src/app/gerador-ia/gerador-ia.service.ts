import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PicLumenCreatePayload, PicLumenProcessTaskPayload, PicLumenTranslatePayload } from './gerador-ia.types';

@Injectable({
  providedIn: 'root'
})
export class GeradorIaService {
  picLumenConfig = {
    listModelsUrl: "https://piclumen.com/api/gen/model/list",
    translateUrl: "https://piclumen.com/api/common/translate",
    createUrl: "https://piclumen.com/api/gen/create",
    processTaskUrl: "https://piclumen.com/api/task/processTask",
    authorization: ""
  }

  constructor(private http: HttpClient) { }

  carregarModelos(): Observable<any> {
    return this.http.get(this.picLumenConfig.listModelsUrl, {
      headers: {
        "platform": "Web",
        "Authorization": this.picLumenConfig.authorization
      }
    })
  }

  traduzir(texto: string): Observable<any> {
    const params: PicLumenTranslatePayload = {
      mode: "translation",
      prompt: texto
    }
    return this.http.get(this.picLumenConfig.translateUrl, {
      params: params,
      headers: {
        "Authorization": this.picLumenConfig.authorization
      }
    })
  }

  aprimorar(texto: string): Observable<any> {
    const params: PicLumenTranslatePayload = {
      mode: "enhance",
      prompt: texto
    }
    return this.http.get(this.picLumenConfig.translateUrl, {
      params: params,
      headers: {
        "Authorization": this.picLumenConfig.authorization
      }
    })
  }

  gerarImagem(params: PicLumenCreatePayload): Observable<any> {
    return this.http.post(this.picLumenConfig.createUrl, JSON.stringify(params), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.picLumenConfig.authorization
      },
    })
  }

  baixarImagem(params: PicLumenProcessTaskPayload): Observable<any> {    
    return this.http.post(`${this.picLumenConfig.processTaskUrl}`, params, {
      headers: {
        "Authorization": this.picLumenConfig.authorization
      },
    })
  }
}
