import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

const PROJECT_COLORS = [
  { label: 'Indigo',  value: '#6366f1' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Amber',   value: '#f59e0b' },
  { label: 'Rose',    value: '#ef4444' },
  { label: 'Violet',  value: '#8b5cf6' },
  { label: 'Cyan',    value: '#06b6d4' },
  { label: 'Orange',  value: '#f97316' },
  { label: 'Lime',    value: '#84cc16' },
  { label: 'Pink',    value: '#ec4899' },
  { label: 'Blue',    value: '#3b82f6' },
];

@Component({
  selector: 'vex-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})       
export class CreateProjectModalComponent implements OnInit {
  form!: FormGroup;
  colors = PROJECT_COLORS;
  statuses = [
    { value: 'on_track',  label: 'On Track'  },
    { value: 'at_risk',   label: 'At Risk'   },
    { value: 'off_track', label: 'Off Track' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProjectModalComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      description: [''],
      color:       [this.colors[0].value, Validators.required],
      status:      ['on_track'],
      dueDate:     [null],
    });
  }

  get selectedColor(): string {
    return this.form.get('color')?.value ?? this.colors[0].value;
  }

  get nameInitials(): string {
    const name: string = this.form.get('name')?.value ?? '';
    return name.trim()
      ? name.trim().split(/\s+/).map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
      : 'P';
  }

  selectColor(hex: string): void {
    this.form.patchValue({ color: hex });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
