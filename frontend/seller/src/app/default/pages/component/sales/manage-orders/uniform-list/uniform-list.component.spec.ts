import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformListComponent } from './uniform-list.component';

describe('UniformListComponent', () => {
  let component: UniformListComponent;
  let fixture: ComponentFixture<UniformListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniformListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniformListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
