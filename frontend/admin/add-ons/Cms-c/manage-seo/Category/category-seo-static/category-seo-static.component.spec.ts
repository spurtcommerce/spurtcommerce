import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySeoStaticComponent } from './category-seo-static.component';

describe('CategorySeoStaticComponent', () => {
  let component: CategorySeoStaticComponent;
  let fixture: ComponentFixture<CategorySeoStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySeoStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySeoStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
