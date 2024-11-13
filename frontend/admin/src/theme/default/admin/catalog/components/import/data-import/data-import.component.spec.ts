import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImportComponent } from './data-import.component';

describe('DataImportComponent', () => {
  let component: DataImportComponent;
  let fixture: ComponentFixture<DataImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
