import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from './../../../environments/environment';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LojaComponent {
  mockupUrl = `${environment.cdnUrl}images/mockup-camiseta.jpg`;
}
