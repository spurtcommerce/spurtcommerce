import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeStaticComponent } from './attribute-static.component';

describe('AttributeStaticComponent', () => {
  let component: AttributeStaticComponent;
  let fixture: ComponentFixture<AttributeStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
