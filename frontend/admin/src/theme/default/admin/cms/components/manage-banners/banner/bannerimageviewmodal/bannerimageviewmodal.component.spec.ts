import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerimageviewmodalComponent } from './bannerimageviewmodal.component';

describe('BannerimageviewmodalComponent', () => {
  let component: BannerimageviewmodalComponent;
  let fixture: ComponentFixture<BannerimageviewmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerimageviewmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerimageviewmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
