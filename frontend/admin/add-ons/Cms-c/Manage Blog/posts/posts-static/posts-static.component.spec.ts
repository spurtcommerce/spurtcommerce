import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsStaticComponent } from './posts-static.component';

describe('PostsStaticComponent', () => {
  let component: PostsStaticComponent;
  let fixture: ComponentFixture<PostsStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
