import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxDetailComponent } from './inbox-detail.component';

describe('InboxDetailComponent', () => {
  let component: InboxDetailComponent;
  let fixture: ComponentFixture<InboxDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InboxDetailComponent]
    });
    fixture = TestBed.createComponent(InboxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
