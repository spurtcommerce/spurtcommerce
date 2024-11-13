import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExportComponent } from './data-export.component';

describe('SmtpComponent', () => {
  let component: DataExportComponent;
  let fixture: ComponentFixture<DataExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
