import { TestBed } from '@angular/core/testing';

import { AngularEditorConfigService } from './angular-editor-config.service';

describe('AngularEditorConfigService', () => {
  let service: AngularEditorConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularEditorConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
