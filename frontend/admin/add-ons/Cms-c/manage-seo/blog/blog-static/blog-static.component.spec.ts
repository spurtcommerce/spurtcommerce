import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogStaticComponent } from './blog-static.component';

describe('BlogStaticComponent', () => {
  let component: BlogStaticComponent;
  let fixture: ComponentFixture<BlogStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
