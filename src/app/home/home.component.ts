import { LojaComponent } from './loja/loja.component';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { Component } from '@angular/core';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CabecalhoComponent, 
    CarrosselComponent,
    LojaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

}
