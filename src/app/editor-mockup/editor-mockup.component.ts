import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import Cropper from 'cropperjs';

@Component({
  selector: 'app-editor-mockup',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editor-mockup.component.html',
  styleUrl: './editor-mockup.component.less'
})

export class EditorMockupComponent {
  @ViewChild("image", { static: false })
  imageElement!: ElementRef;

  @Input("src")
  imageSource!: string;

  imageDestination!: string;
  cropper!: Cropper;

  constructor() {
    this.imageDestination = "";
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.cropper = new Cropper('');
  }
}
