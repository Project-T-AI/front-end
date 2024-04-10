import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviaComponent } from './previa.component';

describe('PreviaComponent', () => {
  let component: PreviaComponent;
  let fixture: ComponentFixture<PreviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
