import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpireComponent } from './token-expire.component';

describe('TokenExpireComponent', () => {
  let component: TokenExpireComponent;
  let fixture: ComponentFixture<TokenExpireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenExpireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
