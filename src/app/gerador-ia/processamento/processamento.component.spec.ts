import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessamentoComponent } from './processamento.component';

describe('ProcessamentoComponent', () => {
  let component: ProcessamentoComponent;
  let fixture: ComponentFixture<ProcessamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
