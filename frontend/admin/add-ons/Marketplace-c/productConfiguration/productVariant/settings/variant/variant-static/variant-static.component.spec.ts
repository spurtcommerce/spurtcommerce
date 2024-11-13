import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantStaticComponent } from './variant-static.component';

describe('VariantStaticComponent', () => {
  let component: VariantStaticComponent;
  let fixture: ComponentFixture<VariantStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariantStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
