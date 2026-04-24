import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxItemComponent } from './inbox-item.component';

describe('InboxItemComponent', () => {
  let component: InboxItemComponent;
  let fixture: ComponentFixture<InboxItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InboxItemComponent]
    });
    fixture = TestBed.createComponent(InboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
