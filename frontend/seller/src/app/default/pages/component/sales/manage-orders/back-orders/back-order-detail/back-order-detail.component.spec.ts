import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOrderDetailComponent } from './back-order-detail.component';

describe('BackOrderDetailComponent', () => {
  let component: BackOrderDetailComponent;
  let fixture: ComponentFixture<BackOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackOrderDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
