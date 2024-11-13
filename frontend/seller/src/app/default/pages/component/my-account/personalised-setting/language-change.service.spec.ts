import { TestBed } from '@angular/core/testing';

import { LanguageChangeService } from './language-change.service';

describe('LanguageChangeService', () => {
  let service: LanguageChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
