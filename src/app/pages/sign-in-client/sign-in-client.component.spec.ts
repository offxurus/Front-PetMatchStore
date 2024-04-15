import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInClientComponent } from './sign-in-client.component';

describe('SignInClientComponent', () => {
  let component: SignInClientComponent;
  let fixture: ComponentFixture<SignInClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
