import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketsComponent } from './manage-tickets.component';

describe('ManageTicketsComponent', () => {
  let component: ManageTicketsComponent;
  let fixture: ComponentFixture<ManageTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
