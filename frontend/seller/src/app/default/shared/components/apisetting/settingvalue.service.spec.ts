import { TestBed } from '@angular/core/testing';

import { SettingvalueService } from './settingvalue.service';

describe('SettingvalueService', () => {
  let service: SettingvalueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingvalueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
