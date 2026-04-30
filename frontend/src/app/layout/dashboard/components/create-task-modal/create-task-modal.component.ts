import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Project, TaskAssignee } from 'src/app/core/models/task.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'vex-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit {
  form!: FormGroup;
  assignees: TaskAssignee[] = [];
  projects: Project[] = [];
  priorities = ['none', 'low', 'medium', 'high'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTaskModalComponent>,
    private dashboardService: DashboardService,
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

    this.dashboardService.getTeamMembers().subscribe({
      next: (res: any) => {
        this.assignees = res.members.map((member: any) => ({
          id: String(member.id),
          name: member.name,
          imgUrl: member.avatar_url || '',
        }));
      },
      error: (err: any) => console.error('Failed to load assignees', err),
    });

    this.dashboardService.GetProjectsByWorkspace().subscribe({
      next: (res: any) => {
        this.projects = res.projects.map((project: any) => ({
          ...project,
          dueDate: project.due_date ? new Date(project.due_date) : undefined,
          members: project.members || [],
          taskCount: project.taskCount || 0,
          completedTaskCount: project.completedTaskCount || 0,
          createdAt: project.createdAt ? new Date(project.createdAt) : new Date(),
        }));
      },
      error: (err: any) => console.error('Failed to load projects', err),
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
