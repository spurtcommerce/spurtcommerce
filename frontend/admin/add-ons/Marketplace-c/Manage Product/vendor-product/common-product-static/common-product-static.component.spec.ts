import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProductStaticComponent } from './common-product-static.component';

describe('CommonProductStaticComponent', () => {
  let component: CommonProductStaticComponent;
  let fixture: ComponentFixture<CommonProductStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonProductStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonProductStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
