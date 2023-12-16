import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EditorMockupComponent } from "./editor-mockup/editor-mockup.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    imports: [CommonModule, RouterOutlet, EditorMockupComponent]
})
export class AppComponent {
  title = 'front-end';
}
