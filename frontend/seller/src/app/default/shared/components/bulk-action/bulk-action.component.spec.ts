import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkActionComponent } from './bulk-action.component';

describe('BulkActionComponent', () => {
  let component: BulkActionComponent;
  let fixture: ComponentFixture<BulkActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
