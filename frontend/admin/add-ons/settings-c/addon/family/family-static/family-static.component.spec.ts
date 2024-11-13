import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyStaticComponent } from './family-static.component';

describe('FamilyStaticComponent', () => {
  let component: FamilyStaticComponent;
  let fixture: ComponentFixture<FamilyStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
