import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorIaComponent } from './gerador-ia.component';

describe('GeradorIaComponent', () => {
  let component: GeradorIaComponent;
  let fixture: ComponentFixture<GeradorIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorIaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeradorIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
