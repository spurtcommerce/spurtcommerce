import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebulkinfoComponent } from './updatebulkinfo.component';

describe('UpdatebulkinfoComponent', () => {
  let component: UpdatebulkinfoComponent;
  let fixture: ComponentFixture<UpdatebulkinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebulkinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebulkinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
