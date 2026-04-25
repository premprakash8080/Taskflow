import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Project, TaskAssignee } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

export type FileType = 'image' | 'document' | 'spreadsheet' | 'pdf' | 'video' | 'link' | 'other';

export interface ProjectFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  uploader: TaskAssignee;
  uploadedAt: Date;
  taskName?: string;
  preview?: string; // image URL for preview
}

const MOCK_UPLOADERS: TaskAssignee[] = [
  { id: 'u1', name: 'David Smith',   imgUrl: 'assets/img/demo/1.jpg' },
  { id: 'u2', name: 'Jenny Zents',   imgUrl: 'assets/img/demo/3.jpg' },
  { id: 'u3', name: 'Michael Bolta', imgUrl: 'assets/img/demo/2.jpg' },
];

@Component({
  selector: 'vex-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFilesComponent implements OnInit, OnDestroy {

  project: Project | undefined;
  files: ProjectFile[] = [];
  filteredFiles: ProjectFile[] = [];
  searchQuery = '';
  viewMode: 'grid' | 'list' = 'grid';
  activeFilter: FileType | 'all' = 'all';

  readonly filters: { value: FileType | 'all'; label: string }[] = [
    { value: 'all',         label: 'All files' },
    { value: 'image',       label: 'Images' },
    { value: 'document',    label: 'Documents' },
    { value: 'spreadsheet', label: 'Spreadsheets' },
    { value: 'pdf',         label: 'PDFs' },
  ];

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.parent!.params.pipe(
        switchMap(params => this.projectsService.getProject(params['projectId']))
      ).subscribe(p => {
        this.project = p;
        if (p) {
          this.files = this.buildMockFiles(p.id);
          this.applyFilter();
        }
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private buildMockFiles(projectId: string): ProjectFile[] {
    const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);
    return [
      { id: 'f1', name: 'Design Mockups v3.fig',    type: 'image',       size: '4.2 MB', uploader: MOCK_UPLOADERS[0], uploadedAt: daysAgo(1),  taskName: 'Design new onboarding flow' },
      { id: 'f2', name: 'Q2 Release Notes.docx',    type: 'document',    size: '128 KB', uploader: MOCK_UPLOADERS[0], uploadedAt: daysAgo(2),  taskName: 'Write Q2 release notes' },
      { id: 'f3', name: 'Sprint Metrics.xlsx',       type: 'spreadsheet', size: '89 KB',  uploader: MOCK_UPLOADERS[1], uploadedAt: daysAgo(3),  taskName: 'Prepare sprint planning deck' },
      { id: 'f4', name: 'User Research Summary.pdf', type: 'pdf',         size: '2.1 MB', uploader: MOCK_UPLOADERS[1], uploadedAt: daysAgo(5),  taskName: 'Conduct user interviews' },
      { id: 'f5', name: 'Onboarding Flow v1.png',    type: 'image',       size: '890 KB', uploader: MOCK_UPLOADERS[0], uploadedAt: daysAgo(6),  taskName: 'Design new onboarding flow',  preview: 'assets/img/demo/1.jpg' },
      { id: 'f6', name: 'API Documentation.docx',   type: 'document',    size: '340 KB', uploader: MOCK_UPLOADERS[2], uploadedAt: daysAgo(7),  taskName: 'Update API documentation' },
      { id: 'f7', name: 'CI-CD Diagram.png',         type: 'image',       size: '156 KB', uploader: MOCK_UPLOADERS[2], uploadedAt: daysAgo(9),  taskName: 'Set up CI/CD pipeline',  preview: 'assets/img/demo/2.jpg' },
      { id: 'f8', name: 'Brand Guidelines.pdf',      type: 'pdf',         size: '6.4 MB', uploader: MOCK_UPLOADERS[1], uploadedAt: daysAgo(12), taskName: 'Design new onboarding flow' },
      { id: 'f9', name: 'Velocity Chart.xlsx',       type: 'spreadsheet', size: '44 KB',  uploader: MOCK_UPLOADERS[0], uploadedAt: daysAgo(14), taskName: 'Prepare sprint planning deck' },
    ];
  }

  applyFilter(): void {
    let result = this.files;
    if (this.activeFilter !== 'all') {
      result = result.filter(f => f.type === this.activeFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(f =>
        f.name.toLowerCase().includes(q) || f.uploader.name.toLowerCase().includes(q)
      );
    }
    this.filteredFiles = result;
  }

  setFilter(f: FileType | 'all'): void {
    this.activeFilter = f;
    this.applyFilter();
  }

  onSearch(): void {
    this.applyFilter();
    this.cd.markForCheck();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
    this.cd.markForCheck();
  }

  // ── Display helpers ─────────────────────────────────────────────────────────

  fileIcon(type: FileType): string {
    const map: Record<FileType, string> = {
      image:       'mat:image',
      document:    'mat:description',
      spreadsheet: 'mat:table_chart',
      pdf:         'mat:picture_as_pdf',
      video:       'mat:videocam',
      link:        'mat:link',
      other:       'mat:attach_file',
    };
    return map[type];
  }

  fileIconColor(type: FileType): string {
    const map: Record<FileType, string> = {
      image:       '#6366f1',
      document:    '#0ea5e9',
      spreadsheet: '#10b981',
      pdf:         '#ef4444',
      video:       '#f59e0b',
      link:        '#8b5cf6',
      other:       '#94a3b8',
    };
    return map[type];
  }

  avatarInitials(name: string): string {
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  avatarColor(id: string): string {
    const palette = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#0ea5e9'];
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffffffff;
    return palette[Math.abs(h) % palette.length];
  }

  timeAgo(date: Date): string {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  }
}
