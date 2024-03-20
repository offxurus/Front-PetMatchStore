import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGalleryComponent } from './dialog-gallery.component';

describe('DialogGalleryComponent', () => {
  let component: DialogGalleryComponent;
  let fixture: ComponentFixture<DialogGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
