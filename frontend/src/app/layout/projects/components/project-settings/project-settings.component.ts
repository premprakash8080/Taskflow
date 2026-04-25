import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Project, ProjectStatus } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

export const PROJECT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#f97316', '#f59e0b', '#84cc16', '#10b981',
  '#06b6d4', '#0ea5e9', '#64748b', '#1e293b',
];

@Component({
  selector: 'vex-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSettingsComponent implements OnInit, OnDestroy {

  project: Project | undefined;
  form!: FormGroup;
  saved = false;
  showDeleteConfirm = false;

  readonly colors = PROJECT_COLORS;
  readonly statusOptions: { value: ProjectStatus; label: string; color: string }[] = [
    { value: 'on_track',  label: 'On track',  color: '#10b981' },
    { value: 'at_risk',   label: 'At risk',   color: '#f59e0b' },
    { value: 'off_track', label: 'Off track', color: '#ef4444' },
  ];

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.parent!.params.pipe(
        switchMap(params => this.projectsService.getProject(params['projectId']))
      ).subscribe(p => {
        this.project = p;
        this.initForm(p);
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initForm(project?: Project): void {
    if (!project) return;
    this.form = this.fb.group({
      name:        [project.name,        [Validators.required, Validators.minLength(1)]],
      description: [project.description ?? ''],
      status:      [project.status,      Validators.required],
      color:       [project.color,       Validators.required],
      dueDate:     [project.dueDate ?? null],
    });
  }

  get selectedColor(): string {
    return this.form?.get('color')?.value ?? '#6366f1';
  }

  selectColor(c: string): void {
    this.form.get('color')!.setValue(c);
    this.form.markAsDirty();
  }

  saveChanges(): void {
    if (!this.form.valid || !this.project) return;
    const updated: Project = {
      ...this.project,
      name:        this.form.value.name.trim(),
      description: this.form.value.description.trim(),
      status:      this.form.value.status,
      color:       this.form.value.color,
      dueDate:     this.form.value.dueDate ?? undefined,
    };
    this.projectsService.updateProject(updated);
    this.form.markAsPristine();
    this.saved = true;
    setTimeout(() => { this.saved = false; this.cd.markForCheck(); }, 2500);
    this.cd.markForCheck();
  }

  statusColor(status: string): string {
    return this.statusOptions.find(s => s.value === status)?.color ?? '#94a3b8';
  }

  statusLabel(status: string): string {
    return this.statusOptions.find(s => s.value === status)?.label ?? status;
  }
}
