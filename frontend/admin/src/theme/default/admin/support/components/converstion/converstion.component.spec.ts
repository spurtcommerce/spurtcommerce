import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverstionComponent } from './converstion.component';

describe('ConverstionComponent', () => {
  let component: ConverstionComponent;
  let fixture: ComponentFixture<ConverstionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverstionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverstionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
