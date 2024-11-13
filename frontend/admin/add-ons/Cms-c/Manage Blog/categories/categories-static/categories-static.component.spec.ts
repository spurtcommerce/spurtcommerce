import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesStaticComponent } from './categories-static.component';

describe('CategoriesStaticComponent', () => {
  let component: CategoriesStaticComponent;
  let fixture: ComponentFixture<CategoriesStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
