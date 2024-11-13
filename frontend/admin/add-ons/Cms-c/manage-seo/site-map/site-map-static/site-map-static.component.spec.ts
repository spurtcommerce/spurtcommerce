import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMapStaticComponent } from './site-map-static.component';

describe('SiteMapStaticComponent', () => {
  let component: SiteMapStaticComponent;
  let fixture: ComponentFixture<SiteMapStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteMapStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteMapStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
