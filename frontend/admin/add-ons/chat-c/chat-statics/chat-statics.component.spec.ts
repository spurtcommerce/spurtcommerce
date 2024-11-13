import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatStaticsComponent } from './chat-statics.component';

describe('ChatStaticsComponent', () => {
  let component: ChatStaticsComponent;
  let fixture: ComponentFixture<ChatStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatStaticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
