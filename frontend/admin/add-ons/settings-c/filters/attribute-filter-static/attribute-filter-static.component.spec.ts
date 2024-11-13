import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeFilterStaticComponent } from './attribute-filter-static.component';

describe('AttributeFilterStaticComponent', () => {
  let component: AttributeFilterStaticComponent;
  let fixture: ComponentFixture<AttributeFilterStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeFilterStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeFilterStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
