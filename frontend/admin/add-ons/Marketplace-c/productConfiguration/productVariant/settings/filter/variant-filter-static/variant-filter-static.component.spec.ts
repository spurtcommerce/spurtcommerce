import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantFilterStaticComponent } from './variant-filter-static.component';

describe('VariantFilterStaticComponent', () => {
  let component: VariantFilterStaticComponent;
  let fixture: ComponentFixture<VariantFilterStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantFilterStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariantFilterStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
