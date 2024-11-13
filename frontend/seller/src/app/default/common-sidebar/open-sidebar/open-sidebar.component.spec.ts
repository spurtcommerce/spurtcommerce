import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSidebarComponent } from './open-sidebar.component';

describe('OpenSidebarComponent', () => {
  let component: OpenSidebarComponent;
  let fixture: ComponentFixture<OpenSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
