import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoComponent } from './seo.component';

describe('SeoComponent', () => {
  let component: SeoComponent;
  let fixture: ComponentFixture<SeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
