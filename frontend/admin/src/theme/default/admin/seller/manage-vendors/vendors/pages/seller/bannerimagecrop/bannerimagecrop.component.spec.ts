import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerimagecropComponent } from './bannerimagecrop.component';

describe('BannerimagecropComponent', () => {
  let component: BannerimagecropComponent;
  let fixture: ComponentFixture<BannerimagecropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerimagecropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerimagecropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
