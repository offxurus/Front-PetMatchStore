import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLoggedComponent } from './client-logged.component';

describe('ClientLoggedComponent', () => {
  let component: ClientLoggedComponent;
  let fixture: ComponentFixture<ClientLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
