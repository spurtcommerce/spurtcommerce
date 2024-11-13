import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStaticComponent } from './common-static.component';

describe('CommonStaticComponent', () => {
  let component: CommonStaticComponent;
  let fixture: ComponentFixture<CommonStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
