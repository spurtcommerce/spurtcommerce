import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupportTicketsComponent } from './admin-support-tickets.component';

describe('AdminSupportTicketsComponent', () => {
  let component: AdminSupportTicketsComponent;
  let fixture: ComponentFixture<AdminSupportTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSupportTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSupportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
