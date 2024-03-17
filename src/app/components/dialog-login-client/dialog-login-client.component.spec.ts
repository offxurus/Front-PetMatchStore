import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginClientComponent } from './dialog-login-client.component';

describe('DialogLoginClientComponent', () => {
  let component: DialogLoginClientComponent;
  let fixture: ComponentFixture<DialogLoginClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoginClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLoginClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
