import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSortComponent } from './common-sort.component';

describe('CommonSortComponent', () => {
  let component: CommonSortComponent;
  let fixture: ComponentFixture<CommonSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
