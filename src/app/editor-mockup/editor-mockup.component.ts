import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CropperPosition, ImageCroppedEvent, ImageCropperModule, ImageTransform } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editor-mockup',
  standalone: true,
  imports: [CommonModule, ImageCropperModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editor-mockup.component.html',
  styleUrl: './editor-mockup.component.less'
})

export class EditorMockupComponent {
  croppedImage: SafeUrl = '';
  croppedImageTemp: SafeUrl = '';
  loading: boolean = false;
  
  canvasRotation: number = 0;
  cropper: CropperPosition = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  };
  transform: ImageTransform = {
    translateUnit: 'px',
    scale: 1,
    rotate: 0,
    flipH: false,
    flipV: false,
    translateH: 0,
    translateV: 0
  };

  constructor(private sanitizer: DomSanitizer) {}

  imageCropped(event: any) {
    this.croppedImageTemp = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || '');
  }

  transformChange(transform: any) {
    this.transform = transform;
  }

  loadImageFailed() {
    console.log("fail to load");
  }

  updateRotation(event: any) {
    this.transform.rotate = Number(event?.target?.value) || 0;
    this.transformChange({...this.transform});
  }

  updateScale(event: any) {
    this.transform.scale = Number(event?.target?.value) || 1;
    this.transformChange({...this.transform});
  }

  cancelUpdates() {
    this.croppedImageTemp = this.croppedImage;
  }

  saveUpdates() {
    this.croppedImage = this.croppedImageTemp;
  }
}
