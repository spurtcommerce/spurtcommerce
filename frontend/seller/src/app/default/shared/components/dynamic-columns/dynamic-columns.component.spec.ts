import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicColumnsComponent } from './dynamic-columns.component';

describe('DynamicColumnsComponent', () => {
  let component: DynamicColumnsComponent;
  let fixture: ComponentFixture<DynamicColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
