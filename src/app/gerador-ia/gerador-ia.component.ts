import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { IntroducaoComponent } from './introducao/introducao.component';

@Component({
  selector: 'app-gerador-ia',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './gerador-ia.component.html',
  styleUrl: './gerador-ia.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GeradorIaComponent implements OnInit{
  constructor() {
  }

  ngOnInit() {
  }
}