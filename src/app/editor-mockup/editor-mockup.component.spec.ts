import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMockupComponent } from './editor-mockup.component';

describe('EditorMockupComponent', () => {
  let component: EditorMockupComponent;
  let fixture: ComponentFixture<EditorMockupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorMockupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
