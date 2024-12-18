import { environment } from './../../../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.less'
})
export class CarrosselComponent {
  imagemBanner:string;

  constructor() {
    this.imagemBanner = environment.cdnUrl + "images/banner-campanha.jpg";
  }
}
