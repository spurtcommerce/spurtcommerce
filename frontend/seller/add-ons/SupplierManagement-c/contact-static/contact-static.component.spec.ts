import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStaticComponent } from './contact-static.component';

describe('ContactStaticComponent', () => {
  let component: ContactStaticComponent;
  let fixture: ComponentFixture<ContactStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
