import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductStaticComponent } from './related-product-static.component';

describe('RelatedProductStaticComponent', () => {
  let component: RelatedProductStaticComponent;
  let fixture: ComponentFixture<RelatedProductStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedProductStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatedProductStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
