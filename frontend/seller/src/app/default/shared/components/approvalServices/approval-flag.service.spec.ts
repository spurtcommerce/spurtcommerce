import { TestBed } from '@angular/core/testing';

import { ApprovalFlagService } from './approval-flag.service';

describe('ApprovalFlagService', () => {
  let service: ApprovalFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
