import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskAssignee } from 'src/app/core/models/task.model';
import { MOCK_ASSIGNEES, MOCK_PROJECTS } from 'src/static-data/taskflow-data';

@Component({
  selector: 'vex-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit {
  form!: FormGroup;
  assignees: TaskAssignee[] = MOCK_ASSIGNEES;
  projects = MOCK_PROJECTS;
  priorities = ['none', 'low', 'medium', 'high'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTaskModalComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      description: [''],
      priority:    ['none'],
      dueDate:     [null],
      assigneeId:  [null],
      projectId:   [null],
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
