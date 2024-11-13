import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorymodalComponent } from './categorymodal.component';

describe('CategorymodalComponent', () => {
  let component: CategorymodalComponent;
  let fixture: ComponentFixture<CategorymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorymodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
