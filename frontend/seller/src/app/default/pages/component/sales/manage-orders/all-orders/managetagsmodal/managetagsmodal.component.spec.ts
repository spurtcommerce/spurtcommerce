import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetagsmodalComponent } from './managetagsmodal.component';

describe('ManagetagsmodalComponent', () => {
  let component: ManagetagsmodalComponent;
  let fixture: ComponentFixture<ManagetagsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagetagsmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagetagsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
