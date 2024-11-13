import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSeoStaticComponent } from './page-seo-static.component';

describe('PageSeoStaticComponent', () => {
  let component: PageSeoStaticComponent;
  let fixture: ComponentFixture<PageSeoStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSeoStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSeoStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
