import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoSelecaoModalComponent } from './endereco-selecao-modal.component';

describe('EnderecoSelecaoModalComponent', () => {
  let component: EnderecoSelecaoModalComponent;
  let fixture: ComponentFixture<EnderecoSelecaoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecoSelecaoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecoSelecaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
