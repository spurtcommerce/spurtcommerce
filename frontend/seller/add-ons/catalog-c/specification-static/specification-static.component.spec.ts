import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationStaticComponent } from './specification-static.component';

describe('SpecificationStaticComponent', () => {
  let component: SpecificationStaticComponent;
  let fixture: ComponentFixture<SpecificationStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificationStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificationStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
