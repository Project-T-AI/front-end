import { NgOptimizedImage } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PromptComponent {
  bannerPrompt = `${environment.cdnUrl}images/banner-prompt.jpg`;
}
