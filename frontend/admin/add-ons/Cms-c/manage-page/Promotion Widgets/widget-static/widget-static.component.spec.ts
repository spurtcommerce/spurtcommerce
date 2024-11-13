import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStaticComponent } from './widget-static.component';

describe('WidgetStaticComponent', () => {
  let component: WidgetStaticComponent;
  let fixture: ComponentFixture<WidgetStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
