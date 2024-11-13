import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisitelistComponent } from './multisitelist.component';

describe('MultisitelistComponent', () => {
  let component: MultisitelistComponent;
  let fixture: ComponentFixture<MultisitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultisitelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultisitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
