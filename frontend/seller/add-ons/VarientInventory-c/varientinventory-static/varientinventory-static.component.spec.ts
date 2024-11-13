import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarientinventoryStaticComponent } from './varientinventory-static.component';

describe('VarientinventoryStaticComponent', () => {
  let component: VarientinventoryStaticComponent;
  let fixture: ComponentFixture<VarientinventoryStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarientinventoryStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarientinventoryStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
