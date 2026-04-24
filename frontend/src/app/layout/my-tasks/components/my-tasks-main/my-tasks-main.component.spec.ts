import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksMainComponent } from './my-tasks-main.component';

describe('MyTasksMainComponent', () => {
  let component: MyTasksMainComponent;
  let fixture: ComponentFixture<MyTasksMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTasksMainComponent]
    });
    fixture = TestBed.createComponent(MyTasksMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
