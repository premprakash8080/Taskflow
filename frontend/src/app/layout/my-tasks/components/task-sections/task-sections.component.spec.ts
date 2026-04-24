import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSectionsComponent } from './task-sections.component';

describe('TaskSectionsComponent', () => {
  let component: TaskSectionsComponent;
  let fixture: ComponentFixture<TaskSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSectionsComponent]
    });
    fixture = TestBed.createComponent(TaskSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
