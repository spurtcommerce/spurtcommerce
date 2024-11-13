import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantDeletionComponent } from './variant-deletion.component';

describe('VariantDeletionComponent', () => {
  let component: VariantDeletionComponent;
  let fixture: ComponentFixture<VariantDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantDeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
