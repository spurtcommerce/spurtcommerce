import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishDataComponent } from './finish-data.component';

describe('FinishDataComponent', () => {
  let component: FinishDataComponent;
  let fixture: ComponentFixture<FinishDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
