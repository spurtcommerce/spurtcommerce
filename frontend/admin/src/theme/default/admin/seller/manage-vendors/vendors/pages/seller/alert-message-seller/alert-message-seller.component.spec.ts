import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageSellerComponent } from './alert-message-seller.component';

describe('AlertMessageSellerComponent', () => {
  let component: AlertMessageSellerComponent;
  let fixture: ComponentFixture<AlertMessageSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertMessageSellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertMessageSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
