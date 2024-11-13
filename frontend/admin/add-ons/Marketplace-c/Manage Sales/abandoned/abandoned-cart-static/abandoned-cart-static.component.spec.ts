import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonedCartStaticComponent } from './abandoned-cart-static.component';

describe('AbandonedCartStaticComponent', () => {
  let component: AbandonedCartStaticComponent;
  let fixture: ComponentFixture<AbandonedCartStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbandonedCartStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbandonedCartStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
