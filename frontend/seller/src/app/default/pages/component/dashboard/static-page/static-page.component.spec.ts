import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageComponent } from './static-page.component';

describe('StaticPageComponent', () => {
  let component: StaticPageComponent;
  let fixture: ComponentFixture<StaticPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
