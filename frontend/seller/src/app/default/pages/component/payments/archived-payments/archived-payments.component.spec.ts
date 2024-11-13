import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPaymentsComponent } from './archived-payments.component';

describe('ArchivedPaymentsComponent', () => {
  let component: ArchivedPaymentsComponent;
  let fixture: ComponentFixture<ArchivedPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
