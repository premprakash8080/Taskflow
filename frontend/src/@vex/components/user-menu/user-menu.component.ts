import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PopoverRef } from '../popover/popover-ref';
import { AuthenticationService } from 'src/app/auth/service/auth.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { ConfigService } from '../../config/config.service';
import { ColorSchemeName } from '../../config/colorSchemeName';

const AVATAR_COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
];

@Component({
  selector: 'vex-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  userName     = '';
  userEmail    = '';
  userInitials = '';
  avatarColor  = AVATAR_COLORS[0];

  isDark$: Observable<boolean> = this.configService.config$.pipe(
    map(c => c.style.colorScheme === ColorSchemeName.dark)
  );

  constructor(
    private readonly popoverRef: PopoverRef,
    private readonly authService: AuthenticationService,
    private readonly userSessionService: UserSessionService,
    private readonly router: Router,
    private readonly configService: ConfigService
  ) {}

  ngOnInit(): void {
    const session     = this.userSessionService.userSession;
    this.userName     = session?.name  || 'User';
    this.userEmail    = session?.email || '';
    this.userInitials = this.buildInitials(this.userName);
    this.avatarColor  = this.pickColor(this.userName);
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

  goToProfile(): void {
    this.popoverRef.close();
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.popoverRef.close();
    this.authService.logout();
  }

  private buildInitials(name: string): string {
    return name.trim()
      .split(/\s+/)
      .map(w => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  private pickColor(name: string): string {
    const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
  }
}
