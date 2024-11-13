import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRegComponent } from './vendor-reg.component';

describe('VendorRegComponent', () => {
  let component: VendorRegComponent;
  let fixture: ComponentFixture<VendorRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
