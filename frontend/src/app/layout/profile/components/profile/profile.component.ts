import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/@vex/config/config.service';
import { ColorSchemeName } from 'src/@vex/config/colorSchemeName';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

const AVATAR_COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
];

@Component({
  selector: 'vex-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name          = '';
  email         = '';
  initials      = '';
  avatarColor   = AVATAR_COLORS[0];
  role          = '';
  workspaceName = '';
  loading       = true;

  isDark$: Observable<boolean> = this.configService.config$.pipe(
    map(c => c.style.colorScheme === ColorSchemeName.dark)
  );

  constructor(
    private userSessionService: UserSessionService,
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.loadFromSession();
    this.fetchProfile();
  }

  private loadFromSession(): void {
    const session       = this.userSessionService.userSession;
    this.name           = session?.name        || 'User';
    this.email          = session?.email       || '';
    this.role           = session?.jobPosition || session?.role || '';
    this.workspaceName  = session?.workspace?.name || '';
    this.initials       = this.buildInitials(this.name);
    this.avatarColor    = this.pickColor(this.name);
  }

  private fetchProfile(): void {
    this.httpService.get(`${environment.apiBaseUrl}/api/users/profile`).subscribe({
      next: (res: any) => {
        const user         = res?.user ?? res;
        this.name          = user?.name        || this.name;
        this.email         = user?.email       || this.email;
        this.role          = user?.jobPosition || user?.role || this.role;
        this.initials      = this.buildInitials(this.name);
        this.avatarColor   = this.pickColor(this.name);
        this.loading       = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  private buildInitials(name: string): string {
    return name.trim()
      .split(/\s+/)
      .map(w => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  toggleTheme(): void {
    this.isDark$.pipe(take(1)).subscribe(isDark => {
      this.configService.updateConfig({
        style: {
          colorScheme: isDark ? ColorSchemeName.default : ColorSchemeName.dark
        }
      });
    });
  }

  private pickColor(name: string): string {
    const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
  }
}
