import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatStaticComponent } from './chat-static.component';

describe('ChatStaticComponent', () => {
  let component: ChatStaticComponent;
  let fixture: ComponentFixture<ChatStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
