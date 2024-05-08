import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessMessageModalComponent } from './sucess-message-modal.component';

describe('SucessMessageModalComponent', () => {
  let component: SucessMessageModalComponent;
  let fixture: ComponentFixture<SucessMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessMessageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
