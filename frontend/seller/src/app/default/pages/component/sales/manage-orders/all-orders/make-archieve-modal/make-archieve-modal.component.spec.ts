import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeArchieveModalComponent } from './make-archieve-modal.component';

describe('MakeArchieveModalComponent', () => {
  let component: MakeArchieveModalComponent;
  let fixture: ComponentFixture<MakeArchieveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeArchieveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeArchieveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
