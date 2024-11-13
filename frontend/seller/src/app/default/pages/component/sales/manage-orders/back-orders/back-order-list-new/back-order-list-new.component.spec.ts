import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOrderListNewComponent } from './back-order-list-new.component';

describe('BackOrderListNewComponent', () => {
  let component: BackOrderListNewComponent;
  let fixture: ComponentFixture<BackOrderListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackOrderListNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOrderListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
