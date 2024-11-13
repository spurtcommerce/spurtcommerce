import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCapabilitiesModalComponent } from './add-capabilities-modal.component';

describe('AddCapabilitiesModalComponent', () => {
  let component: AddCapabilitiesModalComponent;
  let fixture: ComponentFixture<AddCapabilitiesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCapabilitiesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCapabilitiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
