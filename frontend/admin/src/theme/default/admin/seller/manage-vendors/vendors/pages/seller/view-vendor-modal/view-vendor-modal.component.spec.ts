import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorModalComponent } from './view-vendor-modal.component';

describe('ViewVendorModalComponent', () => {
  let component: ViewVendorModalComponent;
  let fixture: ComponentFixture<ViewVendorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVendorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVendorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
