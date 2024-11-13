import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateComponent } from './add-certificate.component';

describe('AddCertificateComponent', () => {
  let component: AddCertificateComponent;
  let fixture: ComponentFixture<AddCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
