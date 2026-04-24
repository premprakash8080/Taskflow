import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxMainComponent } from './inbox-main.component';

describe('InboxMainComponent', () => {
  let component: InboxMainComponent;
  let fixture: ComponentFixture<InboxMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InboxMainComponent]
    });
    fixture = TestBed.createComponent(InboxMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
