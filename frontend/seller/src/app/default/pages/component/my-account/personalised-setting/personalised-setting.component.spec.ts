import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalisedSettingComponent } from './personalised-setting.component';

describe('PersonalisedSettingComponent', () => {
  let component: PersonalisedSettingComponent;
  let fixture: ComponentFixture<PersonalisedSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalisedSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalisedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
