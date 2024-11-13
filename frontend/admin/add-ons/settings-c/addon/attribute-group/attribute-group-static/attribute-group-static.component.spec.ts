import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeGroupStaticComponent } from './attribute-group-static.component';

describe('AttributeGroupStaticComponent', () => {
  let component: AttributeGroupStaticComponent;
  let fixture: ComponentFixture<AttributeGroupStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeGroupStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeGroupStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
